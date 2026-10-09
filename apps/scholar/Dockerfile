FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml ./
COPY packages ./packages
COPY apps/scholar ./apps/scholar
RUN npm install -g pnpm && pnpm install --filter @amal/app-scholar...
RUN pnpm --filter @amal/app-scholar run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3002
COPY --from=builder /app ./
EXPOSE 3002
CMD ["npm", "run", "--prefix", "apps/scholar", "start"]
