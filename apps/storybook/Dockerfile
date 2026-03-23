# syntax=docker/dockerfile:1
# Build from monorepo root: docker build -f apps/storybook/Dockerfile .
# Uses `build-storybook`, not `turbo run build --filter=storybook` (that runs Next.js).

FROM oven/bun:1.3 AS builder
WORKDIR /app

COPY package.json bun.lock turbo.json ./
COPY apps ./apps
COPY packages ./packages

RUN bun install --frozen-lockfile

ENV NODE_ENV=production
RUN bunx turbo run build-storybook --filter=storybook

FROM nginx:1.27-alpine AS runner
COPY apps/storybook/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/apps/storybook/storybook-static /usr/share/nginx/html

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
