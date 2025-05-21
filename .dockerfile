FROM node:22 AS builder

RUN apk update && apk add --no-cache dumb-init

WORKDIR /app
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@10.5.2 --activate

COPY package.json ./
COPY tsconfig.json ./
COPY pnpm-lock.yanl ./

RUN pnpm install --frozen-lockfile --shamefully-hoist
COPY . .
RUN pnpm run build
RUN pnpm prune --prod

FROM node:22-alpine AS runner

WORKDIR /app

RUN apk add --no-cache libc6-compat dumb-init

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

RUN corepack enable && corepack prepare pnpm@10.5.2 --activate

EXPOSE 5437

CMD ["dumb-init", "sh", "-c", "pnpm run preview"]