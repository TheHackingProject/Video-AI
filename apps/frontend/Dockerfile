# syntax=docker/dockerfile:1
# Build from monorepo root:
#   docker build -f apps/frontend/Dockerfile --build-arg VITE_API_BASE_URL=https://api.example.com .

FROM oven/bun:1.3 AS builder
WORKDIR /app

COPY package.json bun.lock turbo.json ./
COPY apps ./apps
COPY packages ./packages

RUN bun install --frozen-lockfile

ARG VITE_API_BASE_URL=http://localhost:8787
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

ENV NODE_ENV=production
RUN bunx turbo run build --filter=frontend

FROM nginx:1.27-alpine AS runner
COPY apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/apps/frontend/dist /usr/share/nginx/html

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
