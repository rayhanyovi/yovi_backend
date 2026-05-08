# iMeeting Backend

Express.js API untuk aplikasi booking ruang meeting iMeeting.

## Prerequisites

- Node.js 20+
- npm
- Docker dan Docker Compose

## Setup Dari Awal

```bash
cp .env.example .env
npm install
docker compose up -d
npm run migrate
npm run seed
npm run dev
```

API berjalan di `http://localhost:4000`.

## Environment

File `.env.example` berisi default lokal:

```env
PORT=4000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_USER=imeeting
DB_PASSWORD=imeeting_pass
DB_NAME=imeeting
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=24h
CORS_ORIGIN=http://localhost:3000
```

Untuk development lokal, cukup copy:

```bash
cp .env.example .env
```

## Database

PostgreSQL berjalan lewat Docker Compose.

```bash
docker compose up -d
docker compose ps
```

Container database bernama `imeeting-db`. Data tersimpan di Docker volume `backend_pgdata`, jadi data tetap ada walaupun container direstart.

Untuk membuat schema dan data demo:

```bash
npm run migrate
npm run seed
```

Untuk reset total database demo:

```bash
npm run db:reset
```

## Demo Users

Semua seeded user memakai password `password123`.

- `john@example.com`
- `jane@example.com`
- `ahmad@example.com`

## Scripts

```bash
npm run dev              # start API dengan nodemon
npm start                # start API dengan node
npm run migrate          # jalankan migration
npm run migrate:rollback # rollback migration terakhir
npm run seed             # jalankan seed data
npm run db:reset         # rollback semua, migrate ulang, seed ulang
```

## Main Endpoints

- `GET /health`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/users`
- `GET /api/units`
- `GET /api/rooms`
- `GET /api/bookings`
- `GET /api/bookings/:id`
- `POST /api/bookings`
- `PATCH /api/bookings/:id`
- `DELETE /api/bookings/:id`
- `GET /api/availability/times`
- `GET /api/availability/rooms`

Booking endpoints membutuhkan header:

```text
Authorization: Bearer <token>
```

## Quick Smoke Test

```bash
curl http://localhost:4000/health
curl http://localhost:4000/api/users
```

Login:

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```
