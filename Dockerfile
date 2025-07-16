# Etapa 1: Build con Node y pnpm
FROM node:20-slim AS build

WORKDIR /app

# Habilitar pnpm con corepack
RUN corepack enable && corepack prepare pnpm@10.5.2 --activate

# Copiar archivos de dependencias primero
COPY package.json ./  
COPY pnpm-lock.yaml ./  

# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Copiar el resto del código
COPY . .

# Variables ARG para pasar desde GitHub Actions
ARG CLERK_PUBLIC_KEY
ARG VAPID_KEY

# Crear archivo de entorno para Vite
RUN echo "VITE_CLERK_PUBLISHABLE_KEY=$CLERK_PUBLIC_KEY" > .env && \
    echo "VITE_VAPID_KEY=$VAPID_KEY" >> .env

# Build de producción
RUN pnpm run build

# Etapa 2: Producción con Nginx
FROM nginx:stable-alpine

# Copiar build al contenedor final
COPY --from=build /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
