# Multi-stage production build for AMAL OS on Railway
FROM node:20-alpine AS builder

WORKDIR /app
RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm@9.0.0

COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml turbo.json* tsconfig*.json ./
COPY packages/ ./packages/
COPY apps/web/ ./apps/web/
COPY services/api/ ./services/api/
COPY scripts/ ./scripts/

RUN pnpm install --frozen-lockfile || pnpm install
RUN pnpm build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/apps/web/out ./apps/web/out
COPY --from=builder /app/services/api/dist ./services/api/dist
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "scripts/serve-railway.mjs"]
