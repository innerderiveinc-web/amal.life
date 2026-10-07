# AMAL OS — Master Cloud Infrastructure & Deployment Specification

## 1. Cloud Architecture Overview

AMAL OS is engineered for high availability (99.95% uptime SLA), elastic scalability, strict data residency, and zero-downtime progressive rollouts. The infrastructure operates across a multi-AZ VPC layout with complete network isolation for data layers.

```text
                           INTERNET
                              │
                    Cloudflare CDN / WAF / DDoS
                              │
                    Public ALB (Port 443 TLS)
                              │
     ┌────────────────────────┴────────────────────────┐
     │ VPC (10.0.0.0/16) - Multi-AZ (az-a, az-b, az-c) │
     │                                                 │
     │  [Private App Subnets]                          │
     │   ├── EKS / GKE Kubernetes Cluster              │
     │   │    ├── amal-api (NestJS Core API)           │
     │   │    ├── amal-worker (BullMQ Background Jobs) │
     │   │    └── amal-web (Next.js Application)       │
     │   │                                             │
     │  [Data Isolated Subnets]                        │
     │   ├── PostgreSQL 16 (pgvector, Multi-AZ Primary)│
     │   ├── PostgreSQL Read Replicas (x2)             │
     │   └── Redis 7 Cluster (BullMQ + Rate Limiting)  │
     └─────────────────────────────────────────────────┘
```

---

## 2. Infrastructure as Code: Terraform 7 Modules

The complete production cloud topology is declared in modular Terraform configuration:

| Module | Purpose | Key Resources |
| :--- | :--- | :--- |
| `01_vpc_network` | Network topology | 3 AZs, 6 subnets (public, private, data), NAT Gateways, VPC Flow Logs |
| `02_security_iam` | Zero-Trust IAM & RBAC | IRSA (IAM Roles for Service Accounts), least-privilege KMS policies, WAF WebACL |
| `03_database_postgres` | Relational & Vector Data | PostgreSQL 16, pgvector extension, Multi-AZ failover, 7-day PITR, KMS FLE |
| `04_cache_redis` | Cache & Queues | Multi-node Redis 7 cluster, in-transit TLS, automated failover, AOF persistence |
| `05_kubernetes_cluster` | Container Compute | Managed EKS/GKE, Karpenter autoscaling, Cilium CNI, private endpoint access |
| `06_secrets_kms` | Secret Management | KMS Customer Managed Keys, External Secrets Operator, HashiCorp Vault |
| `07_storage_cdn` | Static Media & Assets | S3/GCS buckets (Audio, Mushaf vector tiles), CloudFront/Cloud CDN, CORS |

---

## 3. Containerization & Multi-Stage Builds

All container images follow hardened, unprivileged multi-stage Docker builds based on alpine/distroless:

```dockerfile
# Multi-stage production build pattern (services/api/Dockerfile)
FROM node:20-alpine AS builder
WORKDIR /app
COPY pnpm-lock.yaml package.json ./
RUN corepack enable && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build && pnpm prune --prod

FROM node:20-alpine AS runner
WORKDIR /app
RUN addgroup -S amalgroup && adduser -S amaluser -G amalgroup
COPY --from=builder --chown=amaluser:amalgroup /app/dist ./dist
COPY --from=builder --chown=amaluser:amalgroup /app/node_modules ./node_modules
USER amaluser
EXPOSE 4000
ENV NODE_ENV=production
CMD ["node", "dist/main.js"]
```

---

## 4. Kubernetes Manifests & Workload Topology

Workloads are deployed across dedicated Kubernetes namespaces:
- `amal-core`: Production API instances (`amal-api`), autoscaled via Horizontal Pod Autoscaler (HPA) targeting 70% CPU and P95 latency $<150\text{ms}$.
- `amal-workers`: Background job processors (`amal-worker`) for asynchronous notifications, evidence embedding ingestion, and vector re-indexing.
- `amal-web`: Edge-optimized Next.js web application.

### 4.1 Production HPA & Resource Allocations
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: amal-api-hpa
  namespace: amal-core
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: amal-api
  minReplicas: 3
  maxReplicas: 30
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

---

## 5. Progressive Canary Rollouts & Zero-Downtime Deployment

AMAL OS uses **Argo Rollouts** for continuous deployment with automated health metrics:

```text
New Release Tag (v1.x.y)
          ↓
Canary Phase 1: 5% Traffic (15 min) ───► Prometheus Metric Check (Error Rate < 0.1%)
          ↓
Canary Phase 2: 25% Traffic (30 min) ──► Latency Check (P95 < 200ms)
          ↓
Canary Phase 3: 50% Traffic (15 min) ──► AI Citation & Safety Check
          ↓
Full Promotion: 100% Traffic ──────────► Old Replica Termination
```

If error rate spikes $> 0.1\%$ or any Fatwa Firewall red-team invariant is violated, the rollout **aborts immediately and rolls back within 30 seconds**.

---

## 6. CI/CD GitHub Actions Pipeline

The end-to-end continuous delivery pipeline runs on every pull request and release branch:

```text
PR / Commit
     ↓
1. Lint & Format Check (ESLint, Prettier, ShellCheck)
     ↓
2. TypeScript Strict Compilation (tsc --noEmit)
     ↓
3. Database Migration Reversibility Check (migrate:up & migrate:down)
     ↓
4. Master Automated Test Suite (python3 test/run-all-tests.py - 31/31 Pass)
     ↓
5. Security Audit (Trivy container scan, npm audit, SARIF upload)
     ↓
6. Container Image Build & Cosign Signing
     ↓
7. Deploy to Staging & Run E2E Smoke Tests
     ↓
8. Release Tag Trigger -> Progressive Canary to Production
```

---

## 7. Disaster Recovery & Replication Topology

- **RPO (Recovery Point Objective)**: $< 1 \text{ minute}$ via continuous WAL streaming to multi-region cloud storage.
- **RTO (Recovery Time Objective)**: $< 15 \text{ minutes}$ via automated cross-region Terraform failover.
- **Automated Daily Backups**: Executed every 24 hours at 02:00 UTC, validated with an automated ephemeral restore test weekly.
