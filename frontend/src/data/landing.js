import { TicketIcon, ClipboardCheckIcon, BarChartIcon } from '../components/icons';

export const navLinks = [
  { label: 'Untuk Guru', href: '#fitur', active: true },
  { label: 'Untuk Murid', href: '#simulasi', active: false },
  { label: 'Cara kerja', href: '#cara-kerja', active: false },
  { label: 'Fitur', href: '#fitur', active: false },
];

export const trustBadges = [
  { icon: TicketIcon, label: 'Token Ruang' },
  { icon: ClipboardCheckIcon, label: 'Nilai Otomatis' },
  { icon: BarChartIcon, label: 'Rekap Instan' },
];

export const sampleRooms = [
  {
    code: 'SKOR88',
    name: 'Latihan Soal Produktif RPL',
    teacher: 'Pak Hidayat, M.Kom',
    count: '40 Butir Soal',
  },
  {
    code: 'MATK12',
    name: 'Kuis Harian Matematika Peminatan XII',
    teacher: 'Ibu Ratna Dewi, S.Pd',
    count: '30 Butir Soal',
  },
  {
    code: 'IND099',
    name: 'Ulangan Harian Bahasa Indonesia Fase F',
    teacher: 'Drs. Bambang S.',
    count: '50 Butir Soal',
  },
];

export const initialRoom = {
  code: 'SKOR88',
  name: 'Latihan Soal Produktif Rekayasa Perangkat Lunak',
  teacher: 'Pak Hidayat, M.Kom',
  count: '40 Soal',
};

export const statsData = [
  {
    icon: ClipboardCheckIcon,
    title: 'Nilai Otomatis',
    description: 'Langsung keluar saat murid selesai mengerjakan. Guru tidak perlu lagi memeriksa tumpukan lembar jawaban satu per satu.',
    action: 'Koreksi Real-Time',
    iconBg: 'bg-status-success',
  },
  {
    icon: TicketIcon,
    title: 'Token Unik per Ruang',
    description: 'Akses praktis per ruang tanpa pendaftaran rumit. Cukup bagikan 6 karakter token saat jam pelajaran dimulai.',
    action: 'Akses Terjadwal Aman',
    iconBg: 'bg-primary',
  },
  {
    icon: 'layers',
    title: 'Sampai 200+ Soal',
    description: 'Pilihan ganda praktis tanpa cetak kertas. Mampu menampung bank soal skala besar untuk tryout hingga asesmen semester.',
    action: '100% Hemat Kertas',
    iconBg: 'bg-status-warning',
  },
];

export const featuresData = [
  {
    icon: 'upload_file',
    title: 'Unggah Soal & Kunci',
    description: 'Guru mengunggah naskah soal pilihan ganda beserta kunci jawaban dengan cepat.',
    badgeText: 'Format Rapi',
  },
  {
    icon: TicketIcon,
    title: 'Token Ruang',
    description: 'Buat ruang kelas dan bagikan token 6 karakter untuk murid masuk.',
    badgeText: 'Akses Ruang',
  },
  {
    icon: ClipboardCheckIcon,
    title: 'Penilaian Otomatis',
    description: 'Sistem langsung mengoreksi seluruh jawaban murid seketika di server.',
    badgeText: 'Koreksi Kilat',
  },
  {
    icon: BarChartIcon,
    title: 'Rekap Nilai Guru',
    description: 'Nilai seluruh murid otomatis tersusun rapi di dashboard guru.',
    badgeText: 'Rekap Seketika',
  },
];

export const stepsData = [
  {
    step: '1',
    badgeBg: 'bg-primary',
    icon: 'cloud_upload',
    title: 'Unggah Soal & Kunci',
    description: 'Guru menyiapkan naskah soal pilihan ganda dan kunci jawaban.',
    duration: '3 Menit',
    durationColor: 'text-primary',
  },
  {
    step: '2',
    badgeBg: 'bg-primary',
    icon: 'pin',
    title: 'Bagi Token Ruang',
    description: 'Murid memasukkan 6 karakter token ruang untuk mulai mengerjakan.',
    duration: '30 Detik',
    durationColor: 'text-primary',
  },
  {
    step: '3',
    badgeBg: 'bg-status-warning',
    icon: 'download_done',
    title: 'Nilai Langsung Masuk',
    description: 'Murid selesai mengerjakan, nilai otomatis tampil di dashboard guru.',
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
      { label: 'Portal Murid', href: '/masuk' },
      { label: 'Panduan Penggunaan', href: '#cara-kerja' },
      { label: 'Mulai Mengerjakan', href: '#simulasi' },
    ],
  },
  {
    title: 'Dukungan & Legal',
    links: [
      { label: 'Pusat Bantuan', href: '#' },
      { label: 'Kebijakan Privasi', href: '#' },
      { label: 'Syarat & Ketentuan', href: '#' },
      { label: 'Status Server', href: '#' },
    ],
  },
];

export const footerContact = {
  address: 'Kawasan EduTech Nusantara, Surabaya - Malang, Jawa Timur',
  email: 'halo@skorly.id',
  phone: '(0341) 502-8819',
};
