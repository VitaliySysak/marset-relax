FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
COPY .env.production .env.production

RUN npm run build
RUN npx prisma generate

FROM node:20-alpine AS runtime

WORKDIR /app

COPY package.json package-lock.json ./
COPY --from=builder /app/prisma ./prisma 
RUN npm ci --omit=dev

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env.production ./.env.production

EXPOSE 3000

CMD ["npm", "start"]
