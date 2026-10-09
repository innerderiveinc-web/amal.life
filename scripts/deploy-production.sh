#!/usr/bin/env bash
set -euo pipefail

# ==============================================================================
# AMAL OS — PRODUCTION CLOUD DEPLOYMENT AUTOMATION SCRIPT
# ==============================================================================

echo "=========================================================================="
echo "🚀 STARTING AMAL OS PRODUCTION DEPLOYMENT SEQUENCE"
echo "=========================================================================="

# 1. Environment verification
if [ ! -f ".env.production" ]; then
  if [ -f ".env.production.example" ]; then
    echo "⚠️  .env.production not found. Creating from .env.production.example..."
    cp .env.production.example .env.production
    echo "⚠️  Please update .env.production with your real secrets before launching in public production!"
  fi
fi

# 2. Verify Docker and Docker Compose
echo "🔍 Checking Docker environment..."
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker Engine."
    exit 1
fi

# 3. Pull latest base images and build containers
echo "📦 Building AMAL OS Production Containers (Nginx, Web, API, AI, Retrieval, Worker)..."
docker compose -f docker-compose.prod.yml build --parallel

# 4. Launch database and cache
echo "🗄️ Launching PostgreSQL (pgvector) and Redis..."
docker compose -f docker-compose.prod.yml up -d postgres redis

# 5. Wait for database readiness
echo "⏳ Waiting for PostgreSQL to pass health checks..."
docker compose -f docker-compose.prod.yml exec -T postgres sh -c '
until pg_isready -U ${POSTGRES_USER:-amal_admin} -d ${POSTGRES_DB:-amal_prod_db}; do
  echo "Waiting for Postgres...";
  sleep 2;
done'

# 6. Run database migrations
echo "⚙️ Executing Database Migrations..."
docker compose -f docker-compose.prod.yml run --rm api node services/api/dist/index.js --migrate || true

# 7. Start all application services and reverse proxy
echo "🌐 Starting Application Cluster & Reverse Proxy..."
docker compose -f docker-compose.prod.yml up -d

echo "=========================================================================="
echo "✅ AMAL OS IS LIVE AND RUNNING IN PRODUCTION!"
echo "   - Web App:               https://amal.app (or http://localhost:80)"
echo "   - API Gateway:           https://api.amal.app (or http://localhost:4000)"
echo "   - Scholar Portal:        https://scholar.amal.app (or http://localhost:3002)"
echo "   - Health Status:         docker compose -f docker-compose.prod.yml ps"
echo "=========================================================================="
