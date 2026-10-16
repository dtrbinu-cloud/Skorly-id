import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { soalUjian, rooms } from '../data';
import QuestionCard from './QuestionCard';
import Palette from './Palette';
import ConfirmSubmit from './ConfirmSubmit';
import useExamTimer from './useExamTimer';
import useAutosave from './useAutosave';

export default function ExamPage({ mode = 'student' }) {
  const { attemptId = 'demo-1' } = useParams();
  const navigate = useNavigate();

  // Mode: 'demo' | 'student' | 'guru'
  const isDemo = mode === 'demo';

  // State data utama ujian
  const [questions, setQuestions] = useState([]);
  const [roomInfo, setRoomInfo] = useState(null);
  const [deadline, setDeadline] = useState(null);
  const [serverNow, setServerNow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  // State navigasi & jawaban
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flags, setFlags] = useState({});
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobilePaletteOpen, setIsMobilePaletteOpen] = useState(false);

  // Toast "Waktu mulai berjalan"
  const [showToast, setShowToast] = useState(false);

  // Ukuran teks (A- / A / A+) tersimpan di localStorage
  const [textSize, setTextSize] = useState(() => {
    try {
      return localStorage.getItem('skorly_text_size') || 'md';
    } catch {
      return 'md';
    }
  });

  const handleChangeTextSize = (size) => {
    setTextSize(size);
    try {
      localStorage.setItem('skorly_text_size', size);
    } catch {
      // Abaikan error localStorage
    }
  };

  // Simpan otomatis (useAutosave)
  const { statusText, isOffline, enqueueAnswer } = useAutosave({
    attemptId,
    isDemo,
  });

  // Callback waktu habis dari timer
  const handleTimeUp = useCallback(async () => {
    // Belum ada backend: lanjutkan ke hasil tanpa mengirim atau menyimpan data.
    navigate('/hasil', { replace: true });
  }, [navigate]);

  // Hook timer ujian
  const isTimerEnabled = Boolean(deadline);
  const {
    formattedTime,
    isLow: isTimerLow,
    isCritical: isTimerCritical,
    announcement: timerAnnouncement,
  } = useExamTimer({
    deadline,
    serverNow,
    onTimeUp: handleTimeUp,
    isEnabled: isTimerEnabled && !isDemo, // Di mode demo kita tetap bisa tampilkan dummy time
  });

  // Ambil data soal dan status attempt
  const fetchExamData = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);

    if (isDemo) {
      // Mode Demo: gunakan data contoh lokal
      setTimeout(() => {
        setQuestions(soalUjian);
        setRoomInfo({
          judul: 'Simulasi CBT Interaktif',
          durasi: 90,
          soal: soalUjian.length,
          tenggat: '14 Okt 2026, 23.59 WIB',
        });
        const now = Date.now();
        setServerNow(new Date(now).toISOString());
        setDeadline(new Date(now + 90 * 60 * 1000).toISOString());
        setIsLoading(false);
      }, 200);
      return;
    }

    try {
      // Panggilan API riil
      const res = await fetch(`/attempts/${encodeURIComponent(attemptId)}`);

      if (!res.ok) {
        // Jika server API belum siap, fallback ke data room dan soalUjian lokal
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();

      // Jika sudah dikumpulkan sebelumnya, arahkan langsung ke halaman hasil
      if (data.status === 'submitted' || data.status === 'selesai') {
        navigate('/hasil', { replace: true });
        return;
      }

      setQuestions(data.questions || soalUjian);
      setRoomInfo(data.room || rooms[0]);
      setAnswers(data.answers || {});
      setFlags(data.flags || {});
      if (typeof data.lastIndex === 'number') {
        setCurrentIndex(data.lastIndex);
      }
      setDeadline(data.deadline || null);
      setServerNow(data.serverNow || new Date().toISOString());

      if (data.deadline) {
        setShowToast(true);
      }
      setIsLoading(false);
    } catch (err) {
      // Toleransi fallback: jika backend belum hidup atau rute demo dipanggil murid
      const matchedRoom = rooms[0];
      const now = Date.now();

      setQuestions(soalUjian);
      setRoomInfo(matchedRoom);
      setAnswers({});
      setFlags({});
      setCurrentIndex(0);
      setServerNow(new Date(now).toISOString());
      setDeadline(new Date(now + (matchedRoom.durasi || 60) * 60 * 1000).toISOString());
      if (!isDemo) {
        setShowToast(true);
      }
      setIsLoading(false);
    }
  }, [attemptId, isDemo, navigate]);

  useEffect(() => {
    fetchExamData();
  }, [fetchExamData]);

  // Sembunyikan toast setelah 3 detik
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  // Prefetch gambar 2 soal berikutnya menggunakan new Image()
  useEffect(() => {
    if (!questions || questions.length === 0) return;

    const nextIndices = [currentIndex + 1, currentIndex + 2];
    nextIndices.forEach((idx) => {
      if (idx < questions.length) {
        const q = questions[idx];
        // Gambar soal
        if (q.gambar && Array.isArray(q.gambar)) {
          q.gambar.forEach((g) => {
            if (g?.url) {
              const img = new Image();
              img.src = g.url;
            }
          });
        }
        // Gambar wacana
        if (q.wacana?.gambar && Array.isArray(q.wacana.gambar)) {
          q.wacana.gambar.forEach((wg) => {
            if (wg?.url) {
              const img = new Image();
              img.src = wg.url;
            }
          });
        }
        // Gambar opsi
        if (q.opsi && Array.isArray(q.opsi)) {
          q.opsi.forEach((o) => {
            if (o?.gambar?.url) {
              const img = new Image();
              img.src = o.gambar.url;
            }
          });
        }
      }
    });
  }, [currentIndex, questions]);

  // Navigasi soal
  const handlePrev = useCallback(() => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((i) => Math.min(questions.length - 1, i + 1));
  }, [questions.length]);

  // Memilih jawaban
  const handleSelectOption = useCallback(
    (code) => {
      const currentQ = questions[currentIndex];
      if (!currentQ) return;
      const qId = currentQ.id ?? currentIndex;

      setAnswers((prev) => {
        const next = { ...prev, [qId]: code };
        enqueueAnswer({
          questionId: qId,
          pilihan: code,
          ragu: Boolean(flags[qId]),
          lastIndex: currentIndex,
        });
        return next;
      });
    },
    [currentIndex, enqueueAnswer, flags, questions]
  );

  // Toggle Ragu-ragu
  const handleToggleFlag = useCallback(() => {
    const currentQ = questions[currentIndex];
    if (!currentQ) return;
    const qId = currentQ.id ?? currentIndex;
    const nextFlag = !flags[qId];

    setFlags((prev) => {
      const updated = { ...prev, [qId]: nextFlag };
      enqueueAnswer({
        questionId: qId,
        pilihan: answers[qId] || null,
        ragu: nextFlag,
        lastIndex: currentIndex,
      });
      return updated;
    });
  }, [answers, currentIndex, enqueueAnswer, flags, questions]);

  // Pintasan Keyboard: A-E, Panah Kiri/Kanan, R
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Abaikan jika fokus berada di input, textarea, select, atau saat dialog buka
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      if (
        activeTag === 'input' ||
        activeTag === 'textarea' ||
        activeTag === 'select' ||
        isSubmitOpen ||
        isMobilePaletteOpen
      ) {
        return;
      }

      const key = e.key.toUpperCase();

      // Memilih opsi A-E
      if (['A', 'B', 'C', 'D', 'E'].includes(key)) {
        const currentQ = questions[currentIndex];
        const hasOption = currentQ?.opsi?.some((o) => o.kode === key);
        if (hasOption) {
          e.preventDefault();
          handleSelectOption(key);
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (key === 'R' && !e.ctrlKey && !e.altKey && !e.metaKey) {
        e.preventDefault();
        handleToggleFlag();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    currentIndex,
    handleNext,
    handlePrev,
    handleSelectOption,
    handleToggleFlag,
    isMobilePaletteOpen,
    isSubmitOpen,
    questions,
  ]);

  // Hitung rentang wacana bersama
  const sharedReadingRange = useMemo(() => {
    const currentQ = questions[currentIndex];
    if (!currentQ?.wacana?.id) return null;
    const wId = currentQ.wacana.id;

    let start = null;
    let end = null;
    questions.forEach((q, idx) => {
      if (q.wacana?.id === wId) {
        if (start === null) start = idx + 1;
        end = idx + 1;
      }
    });

    return { start, end };
  }, [currentIndex, questions]);

  // Konfirmasi submit akhir
  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulasi submit sementara: tidak ada request backend dan tidak ada
      // penyimpanan hasil ke browser.
      if (isDemo) {
        await new Promise((r) => setTimeout(r, 600));
      }
      navigate('/hasil');
    } catch {
      navigate('/hasil');
    } finally {
      setIsSubmitting(false);
      setIsSubmitOpen(false);
    }
  };

  // Konfirmasi Keluar
  const handleExitClick = () => {
    const confirmExit = window.confirm(
      'Apakah kamu yakin ingin keluar dari ujian? Jawaban yang tersimpan tidak akan hilang.'
    );
    if (confirmExit) {
      navigate('/murid');
    }
  };

  // Keadaan Memuat (Skeleton)
  if (isLoading) {
    return (
      <div className="ex-page">
        <header className="ex-header">
          <div className="ex-header-inner">
            <span className="logo">
              <span className="mark" /> Skorly.id
            </span>
            <span className="small">Memuat ujian…</span>
          </div>
        </header>
        <div className="ex-skeleton-screen">
          <div className="ex-skeleton-card" />
          <div className="ex-skeleton-palette" />
        </div>
      </div>
    );
  }

  // Keadaan Galat Memuat
  if (loadError) {
    return (
      <div className="ex-page">
        <div className="ex-error-screen">
          <span className="material-symbols-outlined ex-error-screen-icon" aria-hidden="true">
            error
          </span>
          <h2 className="ex-error-screen-title">Soal belum bisa dimuat</h2>
          <p className="ex-error-screen-text">
            Terjadi kendala saat mengambil data ujian dari server.
          </p>
          <button
            type="button"
            className="ex-btn ex-btn-primary"
            onClick={fetchExamData}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              refresh
            </span>
            Coba lagi
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).filter(
    (k) => answers[k] !== undefined && answers[k] !== null && answers[k] !== ''
  ).length;

  return (
    <div className="ex-page">
      {/* Pengumuman tersembunyi untuk pembaca layar (Aria-Live) */}
      {timerAnnouncement && (
        <div className="ex-sr-only" role="alert" aria-live="assertive">
          {timerAnnouncement}
        </div>
      )}

      {/* Banner Peringatan Saat Offline */}
      {isOffline && (
        <div className="ex-offline-banner" role="alert">
          <span className="material-symbols-outlined" aria-hidden="true">
            cloud_off
          </span>
          <span>Koneksi terputus. Jawabanmu akan dikirim saat tersambung.</span>
        </div>
      )}

      {/* Header Halaman Utama */}
      <header className="ex-header">
        <div className="ex-header-inner">
          <div className="ex-header-brand">
            <Link to="/" className="logo">
              <span className="mark" /> Skorly.id
            </Link>
            <div className="ex-exam-title-wrap">
              <h1 className="ex-exam-title">
                {roomInfo?.judul || 'Ujian Penilaian Berbasis Komputer'}
              </h1>
              <span className="ex-exam-subtitle">
                {isDemo ? 'Pratinjau Mode Demo' : 'Ruang Ujian Terkendali'}
              </span>
            </div>
          </div>

          <div className="ex-header-controls">
            <button
              type="button"
              className="ex-btn-exit"
              onClick={handleExitClick}
              aria-label="Keluar dari ujian"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                logout
              </span>
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Sub-Baris Atas: Sisa Waktu & Status Simpan */}
      <section className="ex-topbar-strip" aria-label="Informasi waktu dan penyimpanan">
        {/* Kartu Sisa Waktu */}
        <div
          className={`ex-timer-card ${
            isTimerCritical ? 'ex-timer-critical' : isTimerLow ? 'ex-timer-low' : ''
          }`}
          role="timer"
          aria-label={
            isTimerEnabled
              ? `Sisa waktu ujian ${formattedTime}`
              : `Tenggat pengerjaan ${roomInfo?.tenggat || 'hari ini'}`
          }
        >
          <span className="material-symbols-outlined ex-timer-icon" aria-hidden="true">
            timer
          </span>
          <div className="ex-timer-meta">
            <span className="ex-timer-label">
              {isTimerEnabled ? 'Sisa waktu' : 'Tenggat'}
            </span>
            <span className="ex-timer-digits">
              {isTimerEnabled
                ? formattedTime
                : roomInfo?.tenggat || '14 Okt 2026, 23.59'}
            </span>
          </div>
        </div>

        {/* Status Simpan Otomatis */}
        <div
          className={`ex-save-status ex-status-${
            isOffline ? 'unsaved' : statusText === 'Menyimpan…' ? 'saving' : 'saved'
          }`}
          role="status"
          aria-live="polite"
        >
          <span className="ex-save-dot" aria-hidden="true" />
          <span>{statusText}</span>
        </div>
      </section>

      {/* Tata Letak Utama Dua Kolom: 8 Kolom Soal / 4 Kolom Palet */}
      <main className="ex-main-layout">
        {/* Kolom Soal (QuestionCard) */}
        <section className="ex-card-column" aria-label="Soal ujian yang sedang dikerjakan">
          <QuestionCard
            question={currentQuestion}
            total={totalQuestions}
            currentIndex={currentIndex}
            selectedOption={answers[currentQuestion?.id ?? currentIndex]}
            isFlagged={Boolean(flags[currentQuestion?.id ?? currentIndex])}
            onSelectOption={handleSelectOption}
            onToggleFlag={handleToggleFlag}
            onPrev={handlePrev}
            onNext={handleNext}
            onSubmitClick={() => setIsSubmitOpen(true)}
            isFirst={currentIndex === 0}
            isLast={currentIndex === totalQuestions - 1}
            textSize={textSize}
            onChangeTextSize={handleChangeTextSize}
            mode={mode}
            sharedReadingRange={sharedReadingRange}
            isEager={true}
          />
        </section>

        {/* Kolom Palet Nomor Soal */}
        <Palette
          total={totalQuestions}
          currentIndex={currentIndex}
          answers={answers}
          flags={flags}
          questions={questions}
          onSelectIndex={(idx) => setCurrentIndex(idx)}
          onSubmitClick={() => setIsSubmitOpen(true)}
          isOpenMobile={isMobilePaletteOpen}
          onCloseMobile={() => setIsMobilePaletteOpen(false)}
        />
      </main>

      {/* Tombol Melayang Mobile: Daftar Soal */}
      <button
        type="button"
        className="ex-mobile-fab"
        onClick={() => setIsMobilePaletteOpen(true)}
        aria-label={`Buka daftar nomor soal, ${answeredCount} dari ${totalQuestions} terjawab`}
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          grid_view
        </span>
        <span>
          Daftar soal ({answeredCount}/{totalQuestions})
        </span>
      </button>

      {/* Bilah Aksi Bawah Menempel di Layar Mobile (< 980px) */}
      <aside className="ex-mobile-bottom-bar" aria-label="Navigasi soal mobile">
        <div className="ex-footer-actions">
          <button
            type="button"
            className="ex-btn ex-btn-outline"
            disabled={currentIndex === 0}
            onClick={handlePrev}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              arrow_back
            </span>
            <span>Sebelumnya</span>
          </button>

          <button
            type="button"
            className={`ex-btn ex-btn-flag ${
              flags[currentQuestion?.id ?? currentIndex] ? 'ex-flag-active' : ''
            }`}
            onClick={handleToggleFlag}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              bookmark
            </span>
            <span>Ragu</span>
          </button>

          {currentIndex === totalQuestions - 1 ? (
            <button
              type="button"
              className="ex-btn ex-btn-primary ex-btn-submit-check"
              onClick={() => setIsSubmitOpen(true)}
            >
              <span>Periksa</span>
              <span className="material-symbols-outlined" aria-hidden="true">
                fact_check
              </span>
            </button>
          ) : (
            <button
              type="button"
              className="ex-btn ex-btn-primary"
              onClick={handleNext}
            >
              <span>Selanjutnya</span>
              <span className="material-symbols-outlined" aria-hidden="true">
                arrow_forward
              </span>
            </button>
          )}
        </div>
      </aside>

      {/* Modal Dialog Kumpul (ConfirmSubmit) */}
      <ConfirmSubmit
        isOpen={isSubmitOpen}
        total={totalQuestions}
        answers={answers}
        flags={flags}
        questions={questions}
        onClose={() => setIsSubmitOpen(false)}
        onConfirm={handleConfirmSubmit}
        onJumpToQuestion={(idx) => setCurrentIndex(idx)}
        isSubmitting={isSubmitting}
      />

      {/* Toast Notifikasi Mulai */}
      {showToast && (
        <aside className="ex-toast" role="status" aria-live="polite">
          <span className="material-symbols-outlined" aria-hidden="true">
            hourglass_top
          </span>
          <span>Waktu mulai berjalan</span>
        </aside>
      )}
    </div>
  );
}
