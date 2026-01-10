# Task Manager — Full Stack Test

Stack:
- Frontend: React + TypeScript (Vite) + Tailwind
- Backend: NestJS + Prisma
- DB: Postgres (Docker)

## Run (dev)
1) Copy env
cp .env.example .env

2) Start database
docker compose up -d or yarn db:up

3) Start apps
yarn
yarn dev