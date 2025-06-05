# === Build stage ===
FROM node:22 AS builder

RUN apk update && apk add --no-cache dumb-init libc6-compat

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.5.2 --activate

COPY package.json tsconfig.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build
RUN pnpm prune --prod

# === Runner stage ===
FROM nginx:alpine AS runner

# Copia la configuración personalizada de nginx
ADD ./config/default.conf /etc/nginx/conf.d/default.conf

# Corrige la ruta
COPY --from=builder /app/dist /var/www/app

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
