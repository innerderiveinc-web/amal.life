FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml ./
COPY packages ./packages
COPY apps/web ./apps/web
RUN npm install -g pnpm && pnpm install --filter @amal/app-web...
RUN pnpm --filter @amal/app-web run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "run", "--prefix", "apps/web", "start"]
