# AMAL OS — OBSERVABILITY, TELEMETRY & LOGGING SPECIFICATION

## 1. Overview
AMAL OS V1.0 implements a unified observability stack designed for high-availability production environments while strictly upholding Zero-Knowledge personal privacy guarantees.

## 2. Telemetry Pillars

### 1. Structured JSON Logging
All application logs are emitted in JSON format containing standard correlation fields:
- `timestamp`: ISO-8601 UTC timestamp.
- `requestId`: Unique distributed tracing request identifier (`req_...`).
- `traceId` / `spanId`: OpenTelemetry context identifiers.
- `userId`: Redacted or pseudonymous hash (PII is strictly sanitized).
- `level`: `INFO`, `WARN`, `ERROR`, `FATAL`.

### 2. PII Sanitization Firewall
Before writing any log statement or metric attribute, payload sanitizers redact:
- Passwords and auth tokens.
- Private reflection journal contents (`wentWell`, `couldImprove`, `notes`).
- Personal names, phone numbers, and payment details.

### 3. OpenTelemetry Metrics & Prometheus
Prometheus scrapes the `/metrics` endpoint for key operational counters and histograms:
- `http_requests_total{method, path, status}`
- `http_request_duration_seconds{method, path}` (Histogram)
- `ai_inference_duration_seconds{safety_class}`
- `citation_auditor_blocks_total{reason}`
- `circuit_breaker_status{breaker_id}`
- `outbox_queue_depth`
- `active_db_connections`

## 3. Distributed Tracing
OpenTelemetry SDK traces requests end-to-end across:
1. `ApiRouter.handle` (Ingress entrypoint)
2. `PolicyEngine.decide` (Auth & PDP evaluation)
3. `PostgresPool.query` (Database operations)
4. `HybridRetrievalEngine.search` (Vector & BM25 lookups)
5. `LLMClient.generate` (AI model inference)
6. `CitationAuditor.audit` (Citation verification pipeline)

## 4. Alerting Thresholds
- **Critical (P0)**: Citation Auditor detects any unverified Hadith / Ayah in production (`citation_auditor_blocks_total > 0`). Automatically trips `StopTheLineController`.
- **Critical (P0)**: Service error rate > 1% over 5-minute rolling window.
- **High (P1)**: Retrieval $P_{99}$ latency > 200 ms.
- **High (P1)**: Outbox event lag > 60 seconds.
