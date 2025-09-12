# Etapa 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar dependencias
COPY package*.json ./
RUN npm install

# Copiar todo el código
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa 2: Runtime
FROM node:20-alpine AS runner

WORKDIR /app

# Copiar dependencias y build desde el builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Exponer puerto
EXPOSE 3000

# Iniciar servidor Next.js
CMD ["npm", "start"]
