# deps
FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json yarn.lock ./
COPY backend/package.json backend/package.json

RUN yarn install --frozen-lockfile

# build
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
WORKDIR /app/backend

RUN yarn prisma generate --schema=prisma/schema.prisma
RUN yarn build

# Ensure dist exists (had a bug with dist/main.js because of cache and rootDir)
RUN ls -la dist && test -f dist/src/main.js

# runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/backend ./backend
WORKDIR /app/backend

EXPOSE 3000

CMD ["sh", "-c", "yarn prisma migrate deploy --schema=prisma/schema.prisma && node dist/src/main.js"]