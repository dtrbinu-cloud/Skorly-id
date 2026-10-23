/**
 * UnggahSoal.jsx — "Unggah soal" page (step 1 of 3 in "Buat ruang" flow).
 * Route: /guru/buat
 */
import { useCallback, useEffect, useReducer, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Stepper from '../../components/upload/Stepper';
import JenisPicker from '../../components/upload/JenisPicker';
import FileDropzone from '../../components/upload/FileDropzone';
import FileCard from '../../components/upload/FileCard';
import KunciPicker from '../../components/upload/KunciPicker';
import ProcessCard from '../../components/upload/ProcessCard';
import UploadBar from '../../components/upload/UploadBar';
import Icon from '../../components/ui/Icon';
import { validate } from '../../lib/uploadRules';
import useUploadJob from '../../hooks/useUploadJob';
import './UnggahSoal.css';

/* ── Reducer ─────────────────────────────────────────────── */
const initialState = {
  jenis: 'tugas',
  file: null,
  fileError: '',
  kunci: 'sama',
  keyFile: null,
  keyError: '',
  phase: 'form',   // 'form' | 'proc' | 'done' | 'fail'
  tahap: 0,
  persen: 0,
  hasil: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_JENIS':
      return { ...state, jenis: action.value };
    case 'SET_FILE':
      return { ...state, file: action.file, fileError: '' };
    case 'SET_FILE_ERROR':
      return { ...state, file: null, fileError: action.error };
    case 'CLEAR_FILE':
      return { ...state, file: null, fileError: '' };
    case 'SET_KUNCI':
      return {
        ...state,
        kunci: action.value,
        // Do not retain a separately uploaded answer key when it is no longer selected.
        ...(action.value === 'terpisah' ? {} : { keyFile: null, keyError: '' }),
      };
    case 'SET_KEY_FILE':
      return { ...state, keyFile: action.file, keyError: '' };
    case 'SET_KEY_ERROR':
      return { ...state, keyFile: null, keyError: action.error };
    case 'CLEAR_KEY_FILE':
      return { ...state, keyFile: null, keyError: '' };
    case 'START_PROC':
      return { ...state, phase: 'proc', tahap: 0, persen: 0, hasil: null };
    case 'UPDATE_PROC':
      return { ...state, tahap: action.tahap, persen: action.persen };
    case 'DONE':
      return { ...state, phase: 'done', hasil: action.hasil };
    case 'FAIL':
      return { ...state, phase: 'fail', hasil: action.hasil };
    case 'BACK_TO_FORM':
      return {
        ...state,
        phase: 'form',
        tahap: 0,
        persen: 0,
        hasil: null,
        // If failed (scan), clear the soal file
        ...(action.clearFile ? { file: null, fileError: '' } : {}),
      };
    default:
      return state;
  }
}

/* ── Toast hook ──────────────────────────────────────────── */
function useToast() {
  const [msg, setMsg] = useReducer((_, m) => m, '');
  const timer = useRef(null);

  const toast = useCallback((m) => {
    setMsg(m);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMsg(''), 2000);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  return { msg, toast };
}

/* ── Page component ──────────────────────────────────────── */
export default function UnggahSoal() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const { msg: toastMsg, toast } = useToast();
  const liveRef = useRef(null);
  const zoneInputRef = useRef(null);
  const keyInputRef = useRef(null);
  const resultRef = useRef(null);
  const zoneRef = useRef(null);

  const job = useUploadJob();

  // Announce to screen readers
  const say = useCallback((m) => {
    if (liveRef.current) liveRef.current.textContent = m;
  }, []);

  // beforeunload during processing
  useEffect(() => {
    if (state.phase !== 'proc') return;
    const handler = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [state.phase]);

  // Focus result banner when done/fail
  useEffect(() => {
    if ((state.phase === 'done' || state.phase === 'fail') && resultRef.current) {
      resultRef.current.focus();
    }
  }, [state.phase]);

  /* ── File handling ─────────────────────────────────────── */
  const handleFile = useCallback(
    (file) => {
      const err = validate(file);
      if (err) {
        dispatch({ type: 'SET_FILE_ERROR', error: err });
        say(err);
        return;
      }
      dispatch({ type: 'SET_FILE', file });
      say('Berkas ' + file.name + ' siap diproses');
    },
    [say]
  );

  const handleKeyFile = useCallback(
    (file) => {
      const err = validate(file);
      if (err) {
        dispatch({ type: 'SET_KEY_ERROR', error: err });
        say(err);
        return;
      }
      dispatch({ type: 'SET_KEY_FILE', file });
      say('Berkas ' + file.name + ' siap diproses');
    },
    [say]
  );

  const handleRemoveFile = useCallback(() => {
    dispatch({ type: 'CLEAR_FILE' });
    if (zoneInputRef.current) zoneInputRef.current.value = '';
  }, []);

  const handleRemoveKeyFile = useCallback(() => {
    dispatch({ type: 'CLEAR_KEY_FILE' });
    if (keyInputRef.current) keyInputRef.current.value = '';
  }, []);

  const handleMultipleFiles = useCallback(() => {
    toast('Hanya satu berkas yang dipakai');
  }, [toast]);

  /* ── Process handling ──────────────────────────────────── */
  const startProcess = useCallback(async () => {
    dispatch({ type: 'START_PROC' });

    const result = await job.start(
      state.file,
      state.kunci === 'terpisah' ? state.keyFile : null,
      state.jenis
    );
    if (!result) return;

    if (result.cancelled) return;

    if (result.success) {
      const r = result.result;
      dispatch({ type: 'DONE', hasil: r });
      if (r?.tipe === 'ok') {
        say(r.jumlah + ' soal berhasil dibuat');
      } else if (r?.tipe === 'sebagian') {
        say(r.terbaca + ' dari ' + r.total + ' soal terbaca');
      }
    } else {
      dispatch({ type: 'FAIL', hasil: result.result });
      if (result.galat?.kode === 'scan') {
        say('PDF ini berupa gambar hasil scan');
      }
    }
  }, [state.file, state.keyFile, state.kunci, state.jenis, job, say]);

  // Sync job state into reducer
  useEffect(() => {
    if (state.phase === 'proc') {
      dispatch({ type: 'UPDATE_PROC', tahap: job.tahap, persen: job.persen });
      // Announce stage changes
      const labels = ['Mengunggah berkas', 'Membaca soal', 'Mencari gambar', 'Mencocokkan kunci'];
      if (job.tahap < 4 && labels[job.tahap]) {
        say(labels[job.tahap]);
      }
    }
  }, [job.tahap, job.persen, state.phase, say]);

  // Sync result from job into state
  useEffect(() => {
    if (job.result && state.phase === 'proc') {
      if (job.result.tipe === 'scan') {
        dispatch({ type: 'FAIL', hasil: job.result });
        say('PDF ini berupa gambar hasil scan');
      } else {
        dispatch({ type: 'DONE', hasil: job.result });
        if (job.result.tipe === 'ok') {
          say(job.result.jumlah + ' soal berhasil dibuat');
        } else if (job.result.tipe === 'sebagian') {
          say(job.result.terbaca + ' dari ' + job.result.total + ' soal terbaca');
        }
      }
    }
  }, [job.result, state.phase, say]);

  const cancelProcess = useCallback(() => {
    job.cancel();
    dispatch({ type: 'BACK_TO_FORM', clearFile: false });
    // Focus back to zone
    setTimeout(() => {
      if (zoneRef.current) zoneRef.current.focus();
    }, 100);
  }, [job]);

  const backToForm = useCallback(
    (clearFile = false) => {
      dispatch({ type: 'BACK_TO_FORM', clearFile });
      setTimeout(() => {
        if (zoneRef.current) zoneRef.current.focus();
      }, 100);
    },
    []
  );

  /* ── CTA logic ─────────────────────────────────────────── */
  const handleCTA = useCallback(() => {
    if (state.phase === 'form') {
      startProcess();
    } else if (state.phase === 'done') {
      navigate('/guru/buat/periksa', {
        state: { setId: job.setId },
      });
    }
  }, [state.phase, startProcess, navigate, job.setId]);

  let ctaDisabled = false;
  let hintText = '';

  if (state.phase === 'form') {
    if (!state.file) {
      ctaDisabled = true;
      hintText = 'Pilih berkas soal dulu';
    } else if (state.kunci === 'terpisah' && !state.keyFile) {
      ctaDisabled = true;
      hintText = 'Pilih berkas kunci dulu';
    }
  } else if (state.phase === 'proc') {
    ctaDisabled = true;
  } else if (state.phase === 'fail') {
    ctaDisabled = true;
    hintText = 'Pilih berkas lain dulu';
  }

  /* ── Render ────────────────────────────────────────────── */
  return (
    <div className="up-page">
      {/* Aria live region for announcements */}
      <div ref={liveRef} className="up-sr-only" aria-live="polite" />

      {/* Guru header (reuses gd-header CSS from GuruDashboard) */}
      <header className="gd-header">
        <div className="gd-header-in" style={{ maxWidth: 720 }}>
          <Link to="/guru" className="gd-brand">
            <b>S</b>
            <span>Skorly<span>.id</span></span>
            <em>Guru</em>
          </Link>
          <nav>
            <Link to="/guru">Ruang saya</Link>
          </nav>
          <div className="gd-actions">
            <span
              className="gd-avatar-btn"
              style={{ border: 0, padding: 0, cursor: 'default' }}
            >
              <i>BW</i>
            </span>
          </div>
        </div>
      </header>

      <main className="up-main" style={{ paddingTop: 64 }}>
        <div className="up-container">
          <Stepper current={0} />

          <h1 className="up-title">Unggah soal</h1>

          {/* ===== FORM VIEW ===== */}
          {(state.phase === 'form' || state.phase === 'fail') && (
            <div>
              {/* Jenis */}
              <section className="up-sec">
                <h2 className="up-lbl">Jenis</h2>
                <JenisPicker
                  value={state.jenis}
                  onChange={(v) => dispatch({ type: 'SET_JENIS', value: v })}
                />
              </section>

              {/* Berkas soal */}
              <section className="up-sec">
                <h2 className="up-lbl">Berkas soal</h2>
                {state.file ? (
                  <FileCard
                    file={state.file}
                    onReplace={() => zoneInputRef.current?.click()}
                    onRemove={handleRemoveFile}
                  />
                ) : (
                  <div ref={zoneRef}>
                    <FileDropzone
                      kind="soal"
                      onFile={handleFile}
                      onMultiple={handleMultipleFiles}
                      inputRef={zoneInputRef}
                    />
                  </div>
                )}
                {state.fileError && (
                  <p className="up-err" role="alert">
                    <Icon name="error" />
                    <span>{state.fileError}</span>
                  </p>
                )}
                <div className="up-links">
                  <button
                    type="button"
                    className="up-link-btn"
                    onClick={() => toast('Template Excel diunduh')}
                  >
                    <Icon name="download" className="up-link-icon" />
                    Template Excel
                  </button>
                  <button
                    type="button"
                    className="up-link-btn"
                    onClick={() => toast('Membuka contoh format PDF')}
                  >
                    <Icon name="picture_as_pdf" className="up-link-icon" />
                    Contoh PDF
                  </button>
                </div>
              </section>

              {/* Kunci jawaban */}
              <section className="up-sec">
                <h2 className="up-lbl">Kunci jawaban</h2>
                <KunciPicker
                  value={state.kunci}
                  onChange={(v) => dispatch({ type: 'SET_KUNCI', value: v })}
                  keyFile={state.keyFile}
                  keyError={state.keyError}
                  onKeyFile={handleKeyFile}
                  onKeyRemove={handleRemoveKeyFile}
                  onMultiple={handleMultipleFiles}
                />
              </section>
            </div>
          )}

          {/* ===== PROCESS VIEW ===== */}
          {(state.phase === 'proc' || state.phase === 'done') && state.file && (
            <section className="up-sec">
              <ProcessCard
                file={state.file}
                tahap={state.phase === 'done' ? 4 : job.tahap}
                persen={state.phase === 'done' ? 100 : job.persen}
                phase={state.phase}
                result={state.hasil}
                onCancel={cancelProcess}
                onDownloadTemplate={() => toast('Template Excel diunduh')}
                onPickAnother={() => backToForm(true)}
                resultRef={resultRef}
              />
            </section>
          )}
        </div>
      </main>

      {/* Bottom action bar */}
      <UploadBar
        phase={state.phase}
        disabled={ctaDisabled}
        hintText={hintText}
        hintId="up-cta-hint"
        onAction={handleCTA}
        onCancel={() => navigate('/guru')}
      />

      {/* Toast */}
      <div
        className={`up-toast ${toastMsg ? 'up-toast--on' : ''}`}
        role="status"
      >
        {toastMsg}
      </div>
    </div>
  );
}
