-- Skorly.id PostgreSQL schema
-- Jalankan dengan: psql "$DATABASE_URL" -f database/schema.sql

CREATE TYPE user_role AS ENUM ('guru');
CREATE TYPE user_status AS ENUM ('aktif', 'menunggu', 'ditolak', 'nonaktif');
CREATE TYPE source_type AS ENUM ('pdf', 'xlsx', 'csv');
CREATE TYPE set_status AS ENUM ('draf', 'siap');
CREATE TYPE upload_mode AS ENUM ('sama', 'terpisah', 'nanti');
CREATE TYPE upload_stage AS ENUM ('unggah', 'baca', 'gambar', 'kunci', 'selesai', 'gagal');
CREATE TYPE room_type AS ENUM ('tugas', 'ulangan', 'ujian');
CREATE TYPE room_status AS ENUM ('terbuka', 'ditutup');
CREATE TYPE attempt_status AS ENUM ('berjalan', 'dikumpulkan', 'kedaluwarsa');
CREATE TYPE notification_type AS ENUM ('tugas_baru', 'nilai_keluar', 'pengingat', 'ruang_ditutup');
CREATE TYPE image_role AS ENUM ('soal', 'opsi', 'wacana');

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role user_role NOT NULL DEFAULT 'murid',
  status user_status NOT NULL DEFAULT 'aktif',
  sekolah VARCHAR(150),
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT guru_sekolah_check CHECK (role = 'guru')
);

CREATE TABLE refresh_tokens (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  token_hash VARCHAR(255) NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  revoked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE question_sets (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  guru_id BIGINT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  judul VARCHAR(200) NOT NULL,
  sumber_tipe source_type,
  sumber_nama VARCHAR(255),
  status set_status NOT NULL DEFAULT 'draf',
  jumlah_soal INT NOT NULL DEFAULT 0 CHECK (jumlah_soal >= 0),
  dikunci_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE upload_jobs (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  guru_id BIGINT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  set_id BIGINT REFERENCES question_sets(id) ON DELETE SET NULL,
  berkas_soal_path VARCHAR(255) NOT NULL,
  berkas_kunci_path VARCHAR(255),
  mode_kunci upload_mode NOT NULL DEFAULT 'nanti',
  tahap upload_stage NOT NULL DEFAULT 'unggah',
  persen SMALLINT NOT NULL DEFAULT 0 CHECK (persen BETWEEN 0 AND 100),
  galat_kode VARCHAR(20),
  galat_pesan VARCHAR(255),
  hasil_terbaca INT,
  hasil_total INT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  finished_at TIMESTAMPTZ
);

CREATE TABLE passages (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  set_id BIGINT NOT NULL REFERENCES question_sets(id) ON DELETE RESTRICT,
  judul VARCHAR(200),
  teks TEXT NOT NULL
);

CREATE TABLE questions (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  set_id BIGINT NOT NULL REFERENCES question_sets(id) ON DELETE RESTRICT,
  passage_id BIGINT REFERENCES passages(id) ON DELETE SET NULL,
  nomor INT NOT NULL CHECK (nomor > 0),
  teks TEXT NOT NULL,
  rumus VARCHAR(500),
  kunci CHAR(1) CHECK (kunci IS NULL OR kunci BETWEEN 'A' AND 'E'),
  kunci_dari_berkas BOOLEAN NOT NULL DEFAULT false,
  halaman_asal INT,
  peringatan JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (set_id, nomor)
);

CREATE TABLE images (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  set_id BIGINT NOT NULL REFERENCES question_sets(id) ON DELETE RESTRICT,
  question_id BIGINT REFERENCES questions(id) ON DELETE RESTRICT,
  passage_id BIGINT REFERENCES passages(id) ON DELETE RESTRICT,
  peran image_role NOT NULL,
  path VARCHAR(255) NOT NULL,
  alt VARCHAR(255),
  lebar INT,
  tinggi INT,
  urutan INT NOT NULL DEFAULT 0,
  keterangan VARCHAR(200),
  CONSTRAINT image_owner_check CHECK (question_id IS NOT NULL OR passage_id IS NOT NULL)
);

CREATE TABLE question_options (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  question_id BIGINT NOT NULL REFERENCES questions(id) ON DELETE RESTRICT,
  kode CHAR(1) NOT NULL CHECK (kode BETWEEN 'A' AND 'E'),
  teks TEXT,
  image_id BIGINT REFERENCES images(id) ON DELETE SET NULL,
  UNIQUE (question_id, kode)
);

CREATE TABLE rooms (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  set_id BIGINT NOT NULL REFERENCES question_sets(id) ON DELETE RESTRICT,
  guru_id BIGINT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  token CHAR(6) NOT NULL UNIQUE,
  judul VARCHAR(200) NOT NULL,
  jenis room_type NOT NULL DEFAULT 'ulangan',
  status room_status NOT NULL DEFAULT 'terbuka',
  durasi_menit INT CHECK (durasi_menit IS NULL OR durasi_menit > 0),
  buka_pada TIMESTAMPTZ,
  tutup_pada TIMESTAMPTZ,
  acak_soal BOOLEAN NOT NULL DEFAULT false,
  tampilkan_pembahasan BOOLEAN NOT NULL DEFAULT false,
  percobaan_maks SMALLINT NOT NULL DEFAULT 1 CHECK (percobaan_maks > 0),
  hasil_diperiksa_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  closed_at TIMESTAMPTZ,
  CONSTRAINT token_format_check CHECK (token ~ '^[A-Z0-9]{6}$')
);

CREATE TABLE room_members (
  room_id BIGINT NOT NULL REFERENCES rooms(id) ON DELETE RESTRICT,
  murid_id BIGINT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (room_id, murid_id)
);

CREATE TABLE token_percobaan (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  ip INET,
  token_input VARCHAR(20) NOT NULL,
  berhasil BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE attempts (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  room_id BIGINT NOT NULL REFERENCES rooms(id) ON DELETE RESTRICT,
  murid_id BIGINT REFERENCES users(id) ON DELETE RESTRICT,
  guest_name VARCHAR(100),
  guest_token_hash VARCHAR(255) UNIQUE,
  percobaan_ke SMALLINT NOT NULL DEFAULT 1 CHECK (percobaan_ke > 0),
  status attempt_status NOT NULL DEFAULT 'berjalan',
  mulai_pada TIMESTAMPTZ NOT NULL DEFAULT now(),
  batas_waktu TIMESTAMPTZ,
  selesai_pada TIMESTAMPTZ,
  urutan_soal JSONB,
  skor NUMERIC(5,2) CHECK (skor IS NULL OR (skor BETWEEN 0 AND 100)),
  benar INT,
  salah INT,
  total_soal INT,
  durasi_detik INT,
  UNIQUE (room_id, murid_id, percobaan_ke),
  CONSTRAINT participant_check CHECK ((murid_id IS NOT NULL AND guest_name IS NULL AND guest_token_hash IS NULL) OR (murid_id IS NULL AND guest_name IS NOT NULL AND guest_token_hash IS NOT NULL))
);

CREATE TABLE answers (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  attempt_id BIGINT NOT NULL REFERENCES attempts(id) ON DELETE RESTRICT,
  question_id BIGINT NOT NULL REFERENCES questions(id) ON DELETE RESTRICT,
  pilihan CHAR(1) CHECK (pilihan IS NULL OR pilihan BETWEEN 'A' AND 'E'),
  ragu BOOLEAN NOT NULL DEFAULT false,
  is_benar BOOLEAN,
  dijawab_pada TIMESTAMPTZ,
  UNIQUE (attempt_id, question_id)
);

CREATE TABLE notifications (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  tipe notification_type NOT NULL,
  teks VARCHAR(255) NOT NULL,
  room_id BIGINT REFERENCES rooms(id) ON DELETE SET NULL,
  attempt_id BIGINT REFERENCES attempts(id) ON DELETE SET NULL,
  dibaca_pada TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_question_sets_guru ON question_sets(guru_id);
CREATE INDEX idx_upload_jobs_guru_stage ON upload_jobs(guru_id, tahap);
CREATE INDEX idx_questions_set ON questions(set_id);
CREATE INDEX idx_rooms_guru_status ON rooms(guru_id, status);
CREATE INDEX idx_attempts_room_status ON attempts(room_id, status);
CREATE INDEX idx_attempts_student ON attempts(murid_id, created_at);
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, dibaca_pada) WHERE dibaca_pada IS NULL;
