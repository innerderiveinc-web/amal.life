# AMAL OS — Deployment & Infrastructure Guide

## 1. Environments

The platform maintains three strictly isolated environments:
1. `development`: Local Docker Compose stack with mock data and test users.
2. `staging`: Ephemeral cloud cluster for release-blocking AI benchmarks and red-team runs.
3. `production`: Multi-zone Kubernetes or container service with managed Postgres (pgvector) and Redis.

---

## 2. Containerized Deployment

Start local infrastructure using Docker Compose:

```bash
docker-compose -f infrastructure/docker/docker-compose.yml up -d
```

Services exposed:
- PostgreSQL (pgvector): `localhost:5432`
- Redis: `localhost:6379`
- API Service: `http://localhost:4000`

---

## 3. Production Readiness Checklist

Before promoting any build to production:
- [x] TypeScript compilation passes without errors.
- [x] Database migrations verified against clean schema.
- [x] AI Benchmark passes with citation accuracy >99%.
- [x] Zero fabricated citations detected in test suite.
- [x] Fatwa Safety Firewall red-team suite passes with 100% defense.
- [x] Family privacy boundaries verified (zero leakage).
- [x] OWASP MASVS baseline cryptographic and storage checks verified.
