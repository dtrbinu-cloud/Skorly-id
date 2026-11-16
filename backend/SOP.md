# Node.js API SOP

> Instruksi ringkas untuk AI coding agent tersedia di [`../AGENTS.md`](../AGENTS.md).
> Baca dokumen tersebut sebelum mengubah backend.

Padanan SOP Laravel untuk backend Skorly:

```text
routes -> controllers -> validators -> services -> repositories -> resources
```

- Route hanya mendefinisikan URL, middleware, dan controller.
- Controller hanya mengambil input dan memanggil service.
- Validator menangani validasi request.
- Service menangani aturan bisnis dan transaksi.
- Repository menjadi satu-satunya tempat akses database/storage.
- Resource menentukan bentuk response publik; password, answer key, dan field internal tidak boleh keluar.
- Semua response memakai `{ data, message, meta }`.
- Semua error diproses oleh error middleware dengan format `{ error: { code, message, details } }`.
- Data tidak dihapus secara hard delete; gunakan `deletedAt`/status nonaktif.
- Foreign key tidak memakai cascade delete/update. Penghapusan relasi harus ditangani service secara eksplisit.

Struktur minimum:

```text
src/
  controllers/
  middleware/
  repositories/
  resources/
  routes/
  services/
  validators/
```
