import { Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import Landing from './pages/Landing';
import { Shell, Guard } from './components';
import { Login, Register } from './pages/Auth';
import { MuridDash, Hasil } from './pages/Murid';
import { GuruDash } from './pages/Guru';
import GuruDashboard from './pages/GuruDashboard';
import Admin from './pages/Admin';
import { Profil, Pengaturan } from './pages/Akun';
import ExamPage from './exam/ExamPage';
import UnggahSoal from './pages/guru/UnggahSoal';
import PeriksaSoal from './pages/guru/PeriksaSoal';

export default function App() {
  return (
    <Routes>
      {/* Landing page lama tetap menjadi halaman utama. */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Landing />} />
      </Route>
      <Route path="/masuk" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/daftar" element={<Register />} />
      <Route path="/register" element={<Register />} />

      <Route element={<Shell />}>
        <Route path="/murid" element={<Guard role="murid"><MuridDash /></Guard>} />
        <Route path="/hasil" element={<Guard role="murid"><Hasil /></Guard>} />
        <Route path="/guru" element={<Guard role="guru"><GuruDashboard /></Guard>} />
        <Route path="/guru/ruang/:id" element={<Guard role="guru"><GuruDashboard /></Guard>} />
        <Route path="/guru/buat" element={<Guard role="guru"><UnggahSoal /></Guard>} />
        <Route path="/guru/buat/periksa" element={<Guard role="guru"><PeriksaSoal /></Guard>} />
        <Route path="/admin" element={<Guard role="admin"><Admin /></Guard>} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/pengaturan" element={<Pengaturan />} />
      </Route>

      {/* Rute pengerjaan ujian murid dengan attemptId (tanpa token di URL) */}
      <Route path="/kerjakan/:attemptId" element={<ExamPage />} />
      <Route path="/ujian" element={<ExamPage />} />
    </Routes>
  );
}
