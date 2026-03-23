# syntax=docker/dockerfile:1
# Build from monorepo root: docker build -f apps/remotion/Dockerfile .
#
# Runs Remotion Studio for internal preview. `--ipv4` binds for access from outside
# the container (Coolify / reverse proxy). Bundle step validates `remotionb bundle` in CI.

FROM oven/bun:1.3
WORKDIR /app

COPY package.json bun.lock turbo.json ./
COPY apps ./apps
COPY packages ./packages

RUN bun install --frozen-lockfile
RUN bunx turbo run build --filter=remotion

WORKDIR /app/apps/remotion

ENV NODE_ENV=development

EXPOSE 3000

#HEALTHCHECK --interval=30s --timeout=10s --start-period=120s --retries=3 \
# CMD bun -e "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["bunx", "remotionb", "studio", "--ipv4", "--port", "3000"]
