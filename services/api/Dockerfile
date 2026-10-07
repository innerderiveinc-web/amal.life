FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json pnpm-workspace.yaml ./
COPY packages ./packages
COPY services/api ./services/api

RUN npm install -g pnpm && pnpm install --filter @amal/service-api... || true

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app ./
EXPOSE 4000
CMD ["node", "services/api/dist/main.js"]
