# deps
FROM node:20-alpine AS deps
WORKDIR /app

RUN corepack enable && corepack prepare yarn@4.12.0 --activate

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

COPY backend/package.json backend/package.json
COPY frontend/package.json frontend/package.json

RUN yarn workspaces focus ./backend -A

# build
FROM node:20-alpine AS build
WORKDIR /app

RUN corepack enable && corepack prepare yarn@4.12.0 --activate

COPY --from=deps /app /app
COPY . .
WORKDIR /app/backend

RUN yarn prisma generate --schema=prisma/schema.prisma
RUN yarn build

# Ensure dist exists (had a bug with dist/main.js because of cache and rootDir)
RUN ls -la dist && test -f dist/src/main.js

# runner
FROM node:20-alpine AS runner
WORKDIR /app

RUN corepack enable && corepack prepare yarn@4.12.0 --activate

ENV NODE_ENV=production
COPY --from=build /app /app

WORKDIR /app/backend

EXPOSE 3000

WORKDIR /app/backend
CMD ["sh", "-c", "yarn prisma migrate deploy --schema=prisma/schema.prisma && yarn prisma db seed && node dist/src/main.js"]

