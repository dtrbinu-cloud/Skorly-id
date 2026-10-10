export const navLinks = [
  { label: 'Ujian', href: '#', active: true },
  { label: 'Fitur', href: '#fitur', active: false },
  { label: 'Alur', href: '#cara-kerja', active: false },
  { label: 'Simulasi', href: '#pratinjau', active: false },
];

export const trustBadges = [
  { icon: 'verified', label: 'Anti-Kecurangan' },
  { icon: 'wifi_tethering', label: 'Offline-Resilient' },
  { icon: 'sync', label: 'Sync Dapodik' },
];

export const sampleRooms = [
  {
    code: 'SKOR88',
    name: 'Penilaian Akhir Semester Produktif RPL',
    teacher: 'Pak Hidayat, M.Kom',
    count: '40 Butir Soal',
  },
  {
    code: 'MATK12',
    name: 'Ulangan Harian Matematika Peminatan XII',
    teacher: 'Ibu Ratna Dewi, S.Pd',
    count: '30 Butir Soal',
  },
  {
    code: 'IND099',
    name: 'Asesmen Sumatif Bahasa Indonesia Fase F',
    teacher: 'Drs. Bambang S.',
    count: '50 Butir Soal',
  },
];

export const initialRoom = {
  code: 'SKOR88',
  name: 'PAS Produktif Rekayasa Perangkat Lunak',
  teacher: 'Pak Hidayat, M.Kom',
  count: '40 Soal',
};

export const statsData = [
  {
    icon: 'bolt',
    value: '0.2s',
    label: 'Koreksi Kilat',
    iconBg: 'bg-primary',
  },
  {
    icon: 'layers',
    value: '200+',
    label: 'Soal per Ruang',
    iconBg: 'bg-primary',
  },
  {
    icon: 'eco',
    value: '100%',
    label: 'Paperless',
    iconBg: 'bg-status-warning',
  },
];

export const featuresData = [
  {
    icon: 'upload_file',
    title: 'Impor Fleksibel',
    description: 'Unggah file Excel, Word, atau PDF tanpa pengetikan ulang.',
    badgeText: 'Template XLS',
  },
  {
    icon: 'key',
    title: 'Token 1-Klik',
    description: 'Generate token acak untuk mencegah akses di luar jadwal ujian.',
    badgeText: 'Sesi Terenkripsi',
  },
  {
    icon: 'analytics',
    title: 'Analisis Butir',
    description: 'Koreksi seketika beserta indeks daya pembeda dan tingkat kesulitan.',
    badgeText: 'Statistik Nilai',
  },
  {
    icon: 'download',
    title: 'Ekspor Dapodik',
    description: 'Unduh legger nilai format resmi yang kompatibel dengan e-Rapor.',
    badgeText: 'Format Resmi',
  },
];

export const stepsData = [
  {
    step: '1',
    badgeBg: 'bg-primary',
    icon: 'cloud_upload',
    title: 'Unggah Soal',
    description: 'Siapkan naskah soal atau import bank soal.',
    duration: '3 Menit',
    durationColor: 'text-primary',
  },
  {
    step: '2',
    badgeBg: 'bg-primary',
    icon: 'pin',
    title: 'Bagi Token',
    description: 'Siswa memasukkan 6 karakter token ruang.',
    duration: '30 Detik',
    durationColor: 'text-primary',
  },
  {
    step: '3',
    badgeBg: 'bg-status-warning',
    icon: 'download_done',
    title: 'Hasil Seketika',
    description: 'Unduh rekap nilai lengkap begitu ujian usai.',
    duration: '0.2 Detik',
    durationColor: 'text-tertiary-container',
  },
];

export const quizQuestion = {
  number: '14',
  category: 'Pemrograman Web & Perangkat Bergerak',
  weight: '2.5 Poin',
  leadText: 'Perhatikan potongan kode JavaScript berikut dalam penanganan kalkulasi array nilai asesmen:',
  codeSnippet: `const nilaiSiswa = [80, 95, 70, 85];
const total = nilaiSiswa.reduce((acc, curr) => acc + curr, 0);
const rataRata = total / nilaiSiswa.length;`,
  questionText: 'Berdasarkan kode di atas, manakah pernyataan yang paling tepat mengenai nilai akhir variabel',
  questionVar: 'rataRata',
};

export const quizOptions = [
  {
    id: 'A',
    text: 'Variabel bernilai 82.5 dengan tipe data number float',
  },
  {
    id: 'B',
    text: 'Variabel bernilai 82.5 hasil pembagian akumulasi 330 dibagi 4',
  },
  {
    id: 'C',
    text: 'Variabel bernilai NaN karena initial value akumulator tidak didefinisikan',
  },
  {
    id: 'D',
    text: 'Menghasilkan galat sintaksis pada method array reduce callback',
  },
  {
    id: 'E',
    text: 'Variabel bernilai 330 tanpa dilakukan proses reduksi pembagian elemen',
  },
];

export const questionNumbers = Array.from({ length: 20 }, (_, i) =>
  String(i + 1).padStart(2, '0')
);

export const paletteLegends = [
  { colorClass: 'bg-status-success', label: 'Sudah Dijawab' },
  { colorClass: 'bg-status-warning', label: 'Ragu-ragu' },
  { colorClass: 'bg-primary', label: 'Sedang Dibuka' },
  { colorClass: 'bg-surface-container-low', label: 'Belum Dijawab' },
];

export const footerColumns = [
  {
    title: 'Navigasi Utama',
    links: [
      { label: 'Portal Siswa', href: '#' },
      { label: 'Ruang Guru & Proktor', href: '#' },
      { label: 'Jadwal Asesmen Nasional', href: '#' },
      { label: 'Unduh Aplikasi Kunci Layar', href: '#' },
    ],
  },
  {
    title: 'Dukungan & Legal',
    links: [
      { label: 'Pusat Bantuan Proktor', href: '#' },
      { label: 'Kebijakan Privasi Data Siswa', href: '#' },
      { label: 'Syarat & Ketentuan Layanan', href: '#' },
      { label: 'Sertifikasi Enkripsi Data', href: '#' },
    ],
  },
];

export const footerContact = {
  address: 'Kawasan EduTech Nusantara, Surabaya - Malang, Jawa Timur',
  email: 'halo@skorly.id',
  phone: '(0341) 502-8819',
};
