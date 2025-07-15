# Etapa 1: Build con Node y pnpm
FROM node:20-slim AS build

WORKDIR /app

# Habilitar pnpm con corepack
RUN corepack enable && corepack prepare pnpm@10.5.2 --activate

# Copiar archivos de dependencias de forma separada (evita errores en Windows)
COPY package.json ./
COPY pnpm-lock.yaml ./

# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Copiar todo el resto del código fuente
COPY . .

# Compilar la aplicación de Vite
RUN pnpm run build

# Etapa 2: Producción con Nginx
FROM nginx:stable-alpine

# Copiar los archivos estáticos compilados al directorio web de nginx
COPY --from=build /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

# (Opcional) Configuración personalizada de Nginx (si tenés default.conf)

# Exponer el puerto 80
EXPOSE 80

# Comando para arrancar Nginx en modo foreground
CMD ["nginx", "-g", "daemon off;"]
