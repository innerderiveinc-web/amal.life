FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json pnpm-workspace.yaml ./
COPY packages ./packages
COPY services/retrieval ./services/retrieval

RUN npm install -g pnpm && pnpm install --filter @amal/service-retrieval... || true

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app ./
EXPOSE 4002
CMD ["node", "services/retrieval/dist/main.js"]
