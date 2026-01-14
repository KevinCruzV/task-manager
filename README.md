# Task Manager — Full Stack Technical Test

This repository contains a full stack technical test for a task management application.

The project is designed with **two execution modes**:
- a **development mode** (recommended for daily work)
- a **full Docker mode** (production-like, backend only)

---

# Stack

## Frontend
- React
- TypeScript
- Vite
- Tailwind CSS

## Backend
- NestJS
- Prisma ORM

## Database
- PostgreSQL (Docker)

---

# Prerequisites

Make sure the following tools are installed:

- Node.js (v18 or higher)
- Yarn
- Docker
- Docker Compose

---

# Environment Setup

## Copy environment variables

### Backend
Copy the example file and adjust values if needed:
```bash
cp backend/.env.example backend/.env
```
### Frontend
Copy the example file and adjust values if needed:
```bash
cp frontend/.env.example frontend/.env
```

Default values are compatible with the Docker setup.

---

# How to Run the Project

# Mode 1 — Development Mode (Recommended)

**Frontend and backend run locally**  
**Database runs in Docker**

---

## Step 1 — Start the database (Docker)

From the project root:

```bash
yarn db:up
```

---

## Step 2 — Install dependencies

From the project root:

```bash
yarn
```

---

## Step 3 — Seed DB

From the project root:

```bash
yarn workspace backend prisma generate
yarn workspace backend prisma migrate dev
yarn workspace backend prisma db seed
```

---

## Step 4 — Start frontend and backend

From the project root:

```bash
yarn dev
```

This command starts:
- the frontend development server (Vite)
- the backend API

---

## Services URLs (Development Mode)

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Database: PostgreSQL (Docker, port 5432)

---

# Mode 2 — Full Docker Mode (Optional)

**Backend and database run in Docker**  
**Frontend is NOT started in this mode**

---

## Build and start containers

From the project root:

```bash
docker compose up --build
```

This command will:
- start PostgreSQL
- build the backend API Docker image
- apply Prisma migrations automatically
- start the NestJS API container

---

## Stop containers

```bash
docker compose down
```

---

## Start frontend

From the project root:

```bash
yarn dev:frontend
```

This command starts:
- the frontend development server (Vite)

---

## Services URLs (Full Docker Mode)

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Database: PostgreSQL (Docker)

---

# Database & Prisma

- PostgreSQL runs inside a Docker container
- Database data is persisted using Docker volumes
- Prisma is used as the ORM

---

# Useful Commands

## Start database
```bash
yarn db:up
```

## Stop database
```bash
yarn db:down
```

## Access to the database in the container
```bash
yarn db:psql
```

## Install dependencies
```bash
yarn
```

## Start frontend and backend
```bash
yarn dev
```

## Run Prisma migrations manually
```bash
yarn db:migrate
```

# Improvements

- Containerized frontend
- Use cookie session instead of localStorage
- Not rebuild Api image each time