# Skorly.id — Instruksi untuk AI Coding Agent

Dokumen ini wajib dibaca sebelum mengubah kode project Skorly.id.

## Sumber kebenaran

- Kebutuhan produk dan alur UI berada di `frontend/` dan dokumen desain yang diberikan user.
- Aturan backend berada di [`backend/SOP.md`](backend/SOP.md).
- Struktur database relasional berada di [`backend/database/schema.sql`](backend/database/schema.sql).
- Jika instruksi user bertentangan dengan dokumen ini, instruksi user berlaku.
- Jangan menganggap data dummy frontend sebagai data production.

## Arsitektur backend wajib

Gunakan alur berikut:

```text
route → controller → validator → service → repository → storage/database
                                             ↓
                                          resource
```

Aturan:

1. Route hanya berisi URL, middleware, validator, dan controller.
2. Controller tidak boleh mengakses `readDb`, `writeDb`, SQL, atau repository secara langsung.
3. Business logic wajib berada di `src/services/`.
4. Semua query atau akses storage wajib berada di `src/repositories/`.
5. Validasi request wajib berada di `src/validators/` menggunakan `express-validator` atau validator khusus.
6. Response publik wajib melalui resource/serializer dan tidak boleh membocorkan `passwordHash`, answer key, token internal, atau field sensitif.
7. Error wajib diproses oleh middleware error terpusat.
8. Jangan menambahkan query database langsung ke route atau controller.

## Format API

Response sukses:

```json
{
  "data": {},
  "message": "OK",
  "meta": {}
}
```

`meta` boleh dihilangkan jika tidak diperlukan.

Response error:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Data tidak valid.",
    "details": []
  }
}
```

Gunakan HTTP status yang tepat: `400` untuk request rusak, `401` untuk belum login,
`403` untuk tidak berhak, `404` untuk data tidak ditemukan, `409` untuk konflik,
dan `422` untuk validasi.

## Aturan database

- Schema utama adalah `backend/database/schema.sql`.
- Jangan memakai `ON DELETE CASCADE` atau `ON UPDATE CASCADE`.
- Jangan hard delete data penting. Gunakan status nonaktif, `deletedAt`, atau mekanisme soft delete.
- Foreign key dan perubahan data harus ditangani secara eksplisit oleh service.
- Pertahankan konsistensi ID. Schema PostgreSQL menggunakan `BIGINT`; jangan mencampur UUID tanpa alasan dan migrasi yang jelas.
- Password selalu disimpan dalam bentuk hash.
- Token akses/session tidak boleh dikembalikan di response JSON.

## Aturan fitur Skorly

- Role yang tersedia: `murid`, `guru`, dan `admin`.
- Guru membuat bank soal dan ruang ujian.
- Murid masuk ruang memakai token 6 karakter.
- Penilaian dilakukan server-side saat attempt dikumpulkan.
- Answer key tidak boleh dikirim ke client sebelum attempt selesai dan hasil memang boleh dilihat.
- Autosave jawaban harus idempotent dan hanya boleh mengubah attempt milik murid yang sedang login.
- Guru hanya boleh mengakses question set, room, dan hasil miliknya sendiri.
- Endpoint admin harus memiliki middleware role/permission khusus.

## Sebelum menyelesaikan perubahan

Jalankan:

```bash
cd backend
npm run sop:check
node --check index.js
```

Jika mengubah API, tambahkan atau perbarui test endpoint terkait. Jangan menghapus
data user atau database tanpa instruksi eksplisit dari user.

## Catatan storage

Saat ini API MVP masih memakai `backend/data/db.json`. PostgreSQL adalah target
storage relasional sesuai schema. Jika memindahkan storage ke PostgreSQL, pertahankan
kontrak API dan laporkan perubahan migrasi yang diperlukan.
