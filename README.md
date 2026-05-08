# iMeeting Backend

Express.js API for the iMeeting room booking application.

## Setup

```bash
cp .env.example .env
npm install
docker-compose up -d
npm run migrate
npm run seed
npm run dev
```

The API runs on `http://localhost:4000`.

## Demo Users

All seeded users use the password `password123`.

- `john@example.com`
- `jane@example.com`
- `ahmad@example.com`

## Main Endpoints

- `GET /health`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/users`
- `GET /api/units`
- `GET /api/rooms`
- `GET /api/bookings`
- `POST /api/bookings`
- `PATCH /api/bookings/:id`
- `DELETE /api/bookings/:id`
- `GET /api/availability/times`
- `GET /api/availability/rooms`
