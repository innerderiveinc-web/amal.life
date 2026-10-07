FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json pnpm-workspace.yaml ./
COPY packages ./packages
COPY services/ai ./services/ai

RUN npm install -g pnpm && pnpm install --filter @amal/service-ai... || true

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app ./
EXPOSE 4001
CMD ["node", "services/ai/dist/main.js"]
