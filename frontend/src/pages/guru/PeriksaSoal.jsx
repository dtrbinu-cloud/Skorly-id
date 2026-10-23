/**
 * PeriksaSoal.jsx — placeholder page for step 2 ("Periksa soal").
 * Route: /guru/buat/periksa
 */
import { useLocation, useNavigate } from 'react-router-dom';

export default function PeriksaSoal() {
  const location = useLocation();
  const navigate = useNavigate();
  const setId = location.state?.setId;

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px' }}>
      <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-0.025em' }}>
        Periksa soal
      </h1>
      <p style={{ color: '#475569', marginTop: 8 }}>
        Halaman ini sedang dalam pengembangan.
        {setId && (
          <span> Set ID: <code style={{ background: '#f1f5f9', padding: '2px 8px', borderRadius: 6 }}>{setId}</code></span>
        )}
      </p>
      <button
        onClick={() => navigate('/guru/buat')}
        style={{
          marginTop: 24,
          padding: '10px 20px',
          borderRadius: 10,
          border: '1.5px solid #bfdbfe',
          background: '#fff',
          color: '#2563eb',
          fontWeight: 700,
          fontSize: 14,
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        ← Kembali ke unggah
      </button>
    </div>
  );
}
