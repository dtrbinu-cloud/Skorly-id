# Skorly API

API Express untuk autentikasi akun, ruang ujian, attempt murid, autosave jawaban,
dan penilaian otomatis. Schema relasional PostgreSQL tersedia di `database/schema.sql`.
API saat ini masih memakai `data/db.json` sebagai storage MVP; migrasi query ke PostgreSQL
adalah langkah berikutnya setelah PostgreSQL tersedia.

Implementasi API mengikuti pemisahan SOP:

```text
routes → controllers → validators → services → repositories → storage
                                                ↓
                                             resources
```

Route tidak mengakses storage secara langsung. Business logic berada di service,
akses data berada di repository, dan field sensitif disaring oleh resource.

```bash
npm run dev
```

Salin `.env.example` menjadi `.env`, lalu isi `JWT_SECRET` sebelum deployment.

Untuk menyiapkan database PostgreSQL:

```bash
createdb skorly
psql "$DATABASE_URL" -f database/schema.sql
```

Endpoint utama:

- `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`
- `GET/PATCH /api/auth/me`, `PATCH /api/auth/password`
- `GET/POST /api/rooms`, `GET /api/rooms/token/:token`
- `PATCH /api/rooms/:roomId/close`
- `POST/PATCH /api/rooms/:roomId/attempts...`
