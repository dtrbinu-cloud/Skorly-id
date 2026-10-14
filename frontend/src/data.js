export const rooms = [
  { id: 1, judul: 'Matematika Dasar – Bab 3', token: 'SKOR88', soal: 200, durasi: 90, status: 'Buka', peserta: 28, tutup: '12 Okt 2026, 10.00' },
  { id: 2, judul: 'Bahasa Indonesia – PTS', token: 'B4TN-8RLW', soal: 60, durasi: 60, status: 'Buka', peserta: 31, tutup: '14 Okt 2026, 09.00' },
  { id: 3, judul: 'IPA Terpadu – Latihan 2', token: 'H9ZC-2DVE', soal: 40, durasi: 45, status: 'Tutup', peserta: 30, tutup: '2 Okt 2026, 11.30' },
];

export const hasil = [
  { nama: 'Aisyah Putri', benar: 172, nilai: 86, waktu: '09.41' },
  { nama: 'Bagus Pratama', benar: 158, nilai: 79, waktu: '09.52' },
  { nama: 'Citra Lestari', benar: 181, nilai: 90.5, waktu: '09.38' },
  { nama: 'Dimas Aditya', benar: 133, nilai: 66.5, waktu: '09.58' },
];

export const riwayat = [
  { judul: 'IPA Terpadu – Latihan 2', tgl: '2 Okt 2026', benar: 34, total: 40, nilai: 85 },
  { judul: 'Bahasa Inggris – Quiz 4', tgl: '25 Sep 2026', benar: 17, total: 20, nilai: 85 },
  { judul: 'Matematika – Ulangan Harian', tgl: '18 Sep 2026', benar: 41, total: 50, nilai: 82 },
];

export const guruBaru = [
  { id: 1, nama: 'Pak Hendra Saputra', email: 'hendra@smkn1.sch.id', sekolah: 'SMKN 1 Dlanggu' },
  { id: 2, nama: 'Bu Maya Anggraini', email: 'maya@sman2.sch.id', sekolah: 'SMAN 2 Mojokerto' },
];

// --- Data URI Gambar SVG Sederhana untuk Contoh Soal ---
const svgSegitiga = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 280" width="500" height="280">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f0f3ff"/>
      <stop offset="100%" stop-color="#e0ebff"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)" rx="12"/>
  <polygon points="90,220 400,220 90,60" fill="#ffffff" stroke="#004395" stroke-width="3" stroke-linejoin="round"/>
  <polyline points="90,195 115,195 115,220" fill="none" stroke="#004395" stroke-width="2"/>
  <text x="60" y="145" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="700" fill="#004395" text-anchor="middle">a = 12 cm</text>
  <text x="245" y="248" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="700" fill="#004395" text-anchor="middle">b = 16 cm</text>
  <text x="270" y="130" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="700" fill="#1e5bb8" text-anchor="middle">c = ?</text>
  <circle cx="90" cy="220" r="5" fill="#004395"/>
  <circle cx="400" cy="220" r="5" fill="#004395"/>
  <circle cx="90" cy="60" r="5" fill="#004395"/>
</svg>
`)}`;

const svgGrafik1 = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 280" width="500" height="280">
  <rect width="100%" height="100%" fill="#ffffff" rx="12" stroke="#dce2f3"/>
  <text x="250" y="32" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="700" fill="#004395" text-anchor="middle">Grafik I: Penjualan Pupuk Organik (Kuintal)</text>
  <line x1="60" y1="220" x2="450" y2="220" stroke="#c3c6d4" stroke-width="2"/>
  <line x1="60" y1="50" x2="60" y2="220" stroke="#c3c6d4" stroke-width="2"/>
  <rect x="95" y="110" width="55" height="110" rx="4" fill="#004395"/>
  <text x="122" y="100" font-family="sans-serif" font-size="12" font-weight="700" fill="#004395" text-anchor="middle">55</text>
  <text x="122" y="240" font-family="sans-serif" font-size="13" fill="#424752" text-anchor="middle">Jan</text>
  <rect x="195" y="70" width="55" height="150" rx="4" fill="#1e5bb8"/>
  <text x="222" y="60" font-family="sans-serif" font-size="12" font-weight="700" fill="#1e5bb8" text-anchor="middle">75</text>
  <text x="222" y="240" font-family="sans-serif" font-size="13" fill="#424752" text-anchor="middle">Feb</text>
  <rect x="295" y="40" width="55" height="180" rx="4" fill="#10b981"/>
  <text x="322" y="30" font-family="sans-serif" font-size="12" font-weight="700" fill="#047857" text-anchor="middle">90</text>
  <text x="322" y="240" font-family="sans-serif" font-size="13" fill="#424752" text-anchor="middle">Mar</text>
</svg>
`)}`;

const svgGrafik2 = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 280" width="500" height="280">
  <rect width="100%" height="100%" fill="#ffffff" rx="12" stroke="#dce2f3"/>
  <text x="250" y="32" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="700" fill="#b45309" text-anchor="middle">Grafik II: Penjualan Pupuk NPK (Kuintal)</text>
  <line x1="60" y1="220" x2="450" y2="220" stroke="#c3c6d4" stroke-width="2"/>
  <line x1="60" y1="50" x2="60" y2="220" stroke="#c3c6d4" stroke-width="2"/>
  <rect x="95" y="130" width="55" height="90" rx="4" fill="#f59e0b"/>
  <text x="122" y="120" font-family="sans-serif" font-size="12" font-weight="700" fill="#b45309" text-anchor="middle">45</text>
  <text x="122" y="240" font-family="sans-serif" font-size="13" fill="#424752" text-anchor="middle">Jan</text>
  <rect x="195" y="90" width="55" height="130" rx="4" fill="#f59e0b"/>
  <text x="222" y="80" font-family="sans-serif" font-size="12" font-weight="700" fill="#b45309" text-anchor="middle">65</text>
  <text x="222" y="240" font-family="sans-serif" font-size="13" fill="#424752" text-anchor="middle">Feb</text>
  <rect x="295" y="60" width="55" height="160" rx="4" fill="#d97706"/>
  <text x="322" y="50" font-family="sans-serif" font-size="12" font-weight="700" fill="#92400e" text-anchor="middle">80</text>
  <text x="322" y="240" font-family="sans-serif" font-size="13" fill="#424752" text-anchor="middle">Mar</text>
</svg>
`)}`;

const makeShapeSvg = (markup) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 110" width="160" height="110">
  <rect width="100%" height="100%" fill="#f0f3ff" rx="8" stroke="#dce2f3"/>
  ${markup}
</svg>
`)}`;

const svgLingkaran = makeShapeSvg('<circle cx="80" cy="55" r="38" fill="#1e5bb8" opacity="0.9"/>');
const svgPersegi = makeShapeSvg('<rect x="45" y="20" width="70" height="70" fill="#004395" rx="4"/>');
const svgSegitigaSamaSisi = makeShapeSvg('<polygon points="80,18 125,92 35,92" fill="#10b981"/>');
const svgBelahKetupat = makeShapeSvg('<polygon points="80,15 125,55 80,95 35,55" fill="#f59e0b"/>');

// Wacana bersama yang dipakai untuk Soal 5 dan Soal 6
const wacanaBrantas = {
  id: 'wacana-brantas',
  judul: 'Ekologi Daerah Aliran Sungai Brantas',
  teks: 'Sungai Brantas memegang peranan krusial sebagai sumber irigasi pertanian utama di Jawa Timur.\n\nNamun, peningkatan buangan limbah organik dan domestik di daerah hilir menyebabkan fluktuasi kadar oksigen terlarut (*Dissolved Oxygen* / DO). Tim peneliti mengukur parameter air sungai secara berkala untuk memantau keberhasilan reboisasi vegetasi bantaran sungai.',
  gambar: [],
};

/**
 * 6 Soal Contoh Lengkap Sesuai Spesifikasi:
 * 1. Tanpa gambar
 * 2. Dengan 1 gambar
 * 3. Dengan 2 gambar
 * 4. Opsi bergambar
 * 5. Dengan wacana bersama (soal 5 & 6)
 * 6. Dengan rumus (dan wacana bersama)
 */
export const soalUjian = [
  {
    id: 101,
    nomor: 1,
    mapel: 'Matematika',
    materi: 'Aritmatika Pecahan',
    teks: 'Hasil perhitungan dari **3/4** ditambah **5/8** adalah …\n\nPilihlah bentuk pecahan campuran paling sederhana.',
    gambar: [],
    opsi: [
      { kode: 'A', teks: '1 1/8' },
      { kode: 'B', teks: '1 3/8' },
      { kode: 'C', teks: '1 1/4' },
      { kode: 'D', teks: '7/8' },
      { kode: 'E', teks: '1 1/2' },
    ],
    kunci: 'B', // HANYA DEMO & PRATINJAU GURU
  },
  {
    id: 102,
    nomor: 2,
    mapel: 'Matematika',
    materi: 'Geometri & Teorema Pythagoras',
    teks: 'Perhatikan gambar segitiga siku-siku di bawah ini. Panjang sisi tegak a = 12 cm dan sisi alas b = 16 cm.\n\nBerapakah panjang sisi miring *c*?',
    gambar: [
      {
        url: svgSegitiga,
        alt: 'Ilustrasi segitiga siku-siku dengan alas 16 cm dan tinggi 12 cm',
        lebar: 500,
        tinggi: 280,
        keterangan: 'Gambar 1. Segitiga siku-siku ABC dengan sudut siku-siku di titik A.',
      },
    ],
    opsi: [
      { kode: 'A', teks: '18 cm' },
      { kode: 'B', teks: '20 cm' },
      { kode: 'C', teks: '24 cm' },
      { kode: 'D', teks: '28 cm' },
      { kode: 'E', teks: '32 cm' },
    ],
    kunci: 'B', // HANYA DEMO & PRATINJAU GURU
  },
  {
    id: 103,
    nomor: 3,
    mapel: 'Ekonomi',
    materi: 'Analisis Data Penjualan',
    teks: 'Berdasarkan dua diagram batang di bawah, perhatikan perbandingan tren penjualan pupuk organik dan pupuk NPK selama triwulan pertama tahun 2026.\n\nBerapakah **selisih total penjualan** kedua jenis pupuk tersebut pada bulan Maret?',
    gambar: [
      {
        url: svgGrafik1,
        alt: 'Grafik batang penjualan pupuk organik bulan Januari sampai Maret',
        lebar: 500,
        tinggi: 280,
        keterangan: 'Grafik I: Penjualan pupuk organik (kuintal)',
      },
      {
        url: svgGrafik2,
        alt: 'Grafik batang penjualan pupuk NPK bulan Januari sampai Maret',
        lebar: 500,
        tinggi: 280,
        keterangan: 'Grafik II: Penjualan pupuk NPK (kuintal)',
      },
    ],
    opsi: [
      { kode: 'A', teks: '5 kuintal' },
      { kode: 'B', teks: '10 kuintal' },
      { kode: 'C', teks: '15 kuintal' },
      { kode: 'D', teks: '20 kuintal' },
    ],
    kunci: 'B', // HANYA DEMO & PRATINJAU GURU
  },
  {
    id: 104,
    nomor: 4,
    mapel: 'Geometri',
    materi: 'Simetri Lipat Bangun Datar',
    teks: 'Manakah bangun datar berikut yang memiliki **simetri putar tingkat tak hingga**?',
    gambar: [],
    opsi: [
      {
        kode: 'A',
        teks: 'Lingkaran sempurna',
        gambar: {
          url: svgLingkaran,
          alt: 'Bangun datar lingkaran',
          lebar: 160,
          tinggi: 110,
        },
      },
      {
        kode: 'B',
        teks: 'Persegi sama sisi',
        gambar: {
          url: svgPersegi,
          alt: 'Bangun datar persegi',
          lebar: 160,
          tinggi: 110,
        },
      },
      {
        kode: 'C',
        teks: 'Segitiga sama sisi',
        gambar: {
          url: svgSegitigaSamaSisi,
          alt: 'Bangun datar segitiga sama sisi',
          lebar: 160,
          tinggi: 110,
        },
      },
      {
        kode: 'D',
        teks: 'Belah ketupat',
        gambar: {
          url: svgBelahKetupat,
          alt: 'Bangun datar belah ketupat',
          lebar: 160,
          tinggi: 110,
        },
      },
    ],
    kunci: 'A', // HANYA DEMO & PRATINJAU GURU
  },
  {
    id: 105,
    nomor: 5,
    mapel: 'Biologi Lingkungan',
    materi: 'Pencemaran Air & Ekosistem',
    wacana: wacanaBrantas,
    teks: 'Berdasarkan teks bacaan di atas, penurunan kadar oksigen terlarut (*Dissolved Oxygen*) di hilir sungai terutama diakibatkan oleh …',
    gambar: [],
    opsi: [
      { kode: 'A', teks: 'Reboisasi mangrove yang terlalu rapat di hulu' },
      { kode: 'B', teks: 'Akumulasi buangan limbah organik dan domestik' },
      { kode: 'C', teks: 'Aliran air sungai yang bergerak terlalu deras' },
      { kode: 'D', teks: 'Penurunan suhu air secara mendadak pada malam hari' },
      { kode: 'E', teks: 'Pengambilan air untuk irigasi persawahan' },
    ],
    kunci: 'B', // HANYA DEMO & PRATINJAU GURU
  },
  {
    id: 106,
    nomor: 6,
    mapel: 'Kimia Terapan',
    materi: 'Konsentrasi & Titrasi DO',
    wacana: wacanaBrantas,
    teks: 'Kadar *Dissolved Oxygen* (DO) dihitung melalui metode titrasi Winkler dengan menggunakan persamaan berikut:\n\nJika volume natrium tiosulfat yang terpakai V_{1} = 2,5 mL dengan normalitas N = 0,025 N dan volume botol V_{b} = 250 mL, berapakah konsentrasi DO air sungai tersebut?',
    rumus: 'DO = (V_{1} \\times N \\times 8000) / V_{b}',
    gambar: [],
    opsi: [
      { kode: 'A', teks: '1,5 mg/L' },
      { kode: 'B', teks: '2,0 mg/L' },
      { kode: 'C', teks: '2,5 mg/L' },
      { kode: 'D', teks: '3,0 mg/L' },
      { kode: 'E', teks: '4,0 mg/L' },
    ],
    kunci: 'B', // HANYA DEMO & PRATINJAU GURU
  },
];

// Respons POST /sets/upload (pratinjau). kunci:null = belum ada kunci.
export const pratinjau = [
  { no: 1, teks: 'Ibu kota Provinsi Jawa Timur adalah …', opsi: ['Malang', 'Surabaya', 'Kediri', 'Madiun', 'Jember'], kunci: 'B' },
  { no: 2, teks: 'Hasil dari 15 × 12 adalah …', opsi: ['160', '170', '180', '190', '200'], kunci: 'C' },
  { no: 3, teks: 'Sinonim kata "gigih" adalah …', opsi: ['Malas', 'Tekun', 'Ragu', 'Lamban', 'Cepat'], kunci: null },
  { no: 4, teks: 'Lambang kimia untuk air adalah …', opsi: ['CO2', 'O2', 'H2O', 'NaCl', 'H2'], kunci: 'C' },
  { no: 5, teks: 'Proklamasi kemerdekaan Indonesia dibacakan pada tahun …', opsi: ['1942', '1945', '1949', '1950', '1955'], kunci: null },
];
