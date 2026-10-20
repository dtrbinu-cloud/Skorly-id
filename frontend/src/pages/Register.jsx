import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth';

export default function Register() {
  const [role, setRole] = useState('murid');
  const [nama, setNama] = useState('Ahmad Farhan');
  const [email, setEmail] = useState('ahmad.farhan@sekolah.id');
  const [password, setPassword] = useState('rahasia123');
  const [confirmPassword, setConfirmPassword] = useState('rahasia123');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [confirmError, setConfirmError] = useState(false);
  const [viewState, setViewState] = useState('form'); // 'form' | 'success-guru' | 'success-murid'
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    let hasError = false;

    // Validasi email
    if (email.toLowerCase().includes('terdaftar') || email.toLowerCase().includes('error')) {
      setEmailError(true);
      hasError = true;
    } else {
      setEmailError(false);
    }

    // Validasi password match
    if (password !== confirmPassword) {
      setConfirmError(true);
      hasError = true;
    } else {
      setConfirmError(false);
    }

    if (hasError) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      if (role === 'guru') {
        setViewState('success-guru');
      } else {
        setViewState('success-murid');
      }
    }, 600);
  };

  const handleMuridLoginNow = () => {
    if (login) {
      login(email, nama);
      navigate('/murid');
    } else {
      navigate('/masuk');
    }
  };

  return (
    <main className="fixed inset-0 w-full h-screen max-h-screen bg-surface flex flex-col justify-stretch overflow-hidden">
      <div className="h-full w-full flex flex-col lg:flex-row bg-surface-canvas font-body-md text-on-surface overflow-hidden">
        {/* LEFT COLUMN: Brand Hero & Value Proposition (#004395) */}
        <div className="relative hidden lg:flex w-full lg:w-1/2 bg-primary text-on-primary flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12 overflow-hidden h-full">
          {/* Faint Geometric Hexagon/Polygon SVG Vector Background */}
          <div className="absolute inset-0 pointer-events-none opacity-15 overflow-hidden">
            <svg
              className="w-full h-full object-cover"
              fill="none"
              viewBox="0 0 720 900"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                points="620,120 740,190 740,330 620,400 500,330 500,190"
                stroke="currentColor"
                strokeWidth="2"
              ></polygon>
              <polygon
                fill="currentColor"
                fillOpacity="0.05"
                points="620,120 740,190 740,330 620,400 500,330 500,190"
              ></polygon>
              <polygon
                points="340,380 460,450 460,590 340,660 220,590 220,450"
                stroke="currentColor"
                strokeWidth="2"
              ></polygon>
              <polygon
                points="120,680 220,740 220,850 120,910 20,850 20,740"
                stroke="currentColor"
                strokeWidth="1.5"
              ></polygon>
              <circle
                cx="580"
                cy="540"
                r="140"
                stroke="currentColor"
                strokeDasharray="8 8"
                strokeWidth="1.5"
              ></circle>
              <path d="M50 220L180 290L180 420" stroke="currentColor" strokeWidth="2"></path>
              <path d="M460 210L580 280L580 410" stroke="currentColor" strokeWidth="1.5"></path>
              <polygon
                points="40,40 100,75 100,145 40,180 -20,145 -20,75"
                stroke="currentColor"
                strokeWidth="1"
              ></polygon>
            </svg>
          </div>

          {/* Left Header: Skorly.id Brandmark */}
          <div className="relative z-10 flex items-center gap-space-sm">
            <Link to="/" className="flex items-center gap-space-sm hover:opacity-90 transition-opacity">
              <div className="w-10 h-10 rounded-xl bg-surface-card flex items-center justify-center text-primary shadow-md">
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  quiz
                </span>
              </div>
              <span className="font-headline-md text-headline-md tracking-tight text-surface-card">
                Skorly<span className="text-primary-fixed">.id</span>
              </span>
            </Link>
          </div>

          {/* Left Body: Headline, Subline & Feature Points */}
          <div className="relative z-10 flex-1 w-full flex flex-col items-center justify-end pb-2 xl:pb-4">
            <img
              src="/assets/register-illustration-source.png"
              alt="Ilustrasi pendaftaran akun Skorly"
              className="auth-illustration w-full max-w-[900px] h-auto max-h-[650px] object-contain mx-auto mb-2 xl:mb-4"
            />
          </div>

        </div>

        {/* RIGHT COLUMN: Registration Form & States (#F3F6FB) */}
        <div className="w-full lg:w-1/2 bg-surface-canvas flex flex-col justify-start items-center p-4 sm:p-5 lg:p-6 h-full overflow-y-auto">
          {/* Mobile Brand Header */}
          <div className="flex lg:hidden items-center space-x-2.5 mb-2.5">
            <Link to="/" className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-md">
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  quiz
                </span>
              </div>
              <div className="flex items-baseline tracking-tight font-headline-md text-headline-md text-primary font-bold">
                <span>Skorly</span>
                <span className="text-tertiary-fixed font-bold">.id</span>
              </div>
            </Link>
          </div>

          {/* Center Content Wrapper (Max 440px) */}
          <div className="w-full max-w-[440px] my-auto py-2 sm:py-4">
            {/* ================= CARD 1: FORM VIEW ================= */}
            {viewState === 'form' && (
              <div
                className="bg-surface-card rounded-xl p-4 sm:p-6 shadow-[0_4px_24px_-4px_rgba(15,42,92,0.08)] flex flex-col transition-all duration-300"
                id="form-card"
              >
                <div className="mb-2.5 sm:mb-3">
                  <h2 className="font-headline-md text-lg sm:text-xl font-bold text-on-surface mb-0.5">
                    Daftar Akun Baru
                  </h2>
                  <p className="font-body-sm text-xs text-text-muted">
                  </p>
                </div>

                {/* Segmented Control Role Switcher */}
                <div className="mb-2.5 sm:mb-3">
                  <label className="block font-label-md text-xs text-on-surface mb-1">
                    Daftar sebagai
                  </label>
                  <div className="grid grid-cols-2 p-1 rounded-lg bg-surface-container-high gap-1">
                    {/* Tab Murid */}
                    <button
                      id="tab-murid"
                      type="button"
                      onClick={() => setRole('murid')}
                      className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg font-label-md text-xs transition-all duration-200 font-semibold ${role === 'murid'
                          ? 'bg-primary-container text-on-primary shadow-sm'
                          : 'text-on-surface hover:bg-surface-card/60'
                        }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">school</span>
                      <span>Murid</span>
                    </button>
                    {/* Tab Guru */}
                    <button
                      id="tab-guru"
                      type="button"
                      onClick={() => setRole('guru')}
                      className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg font-label-md text-xs transition-all duration-200 font-semibold ${role === 'guru'
                          ? 'bg-primary-container text-on-primary shadow-sm'
                          : 'text-on-surface hover:bg-surface-card/60'
                        }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">cast_for_education</span>
                      <span>Guru</span>
                    </button>
                  </div>
                </div>

                {/* Input Fields Form */}
                <form className="space-y-2 sm:space-y-2.5" noValidate onSubmit={handleFormSubmit}>
                  {/* Field: Nama Lengkap */}
                  <div>
                    <label
                      className="block font-label-md text-[11px] sm:text-xs text-on-surface mb-0.5"
                      htmlFor="input-nama"
                    >
                      Nama Lengkap
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3 text-text-muted text-[17px] pointer-events-none">
                        person
                      </span>
                      <input
                        id="input-nama"
                        type="text"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        placeholder="Masukkan nama lengkap Anda"
                        className="w-full h-9 sm:h-10 pl-9 pr-3 rounded-lg bg-surface-container-low text-text-primary font-body-sm text-xs outline-none focus:bg-surface-card focus:shadow-sm transition-all duration-150"
                      />
                    </div>
                  </div>

                  {/* Field: Email */}
                  <div>
                    <div className="flex items-center justify-between mb-0.5">
                      <label
                        className="font-label-md text-[11px] sm:text-xs text-on-surface"
                        htmlFor="input-email"
                      >
                        Alamat Email
                      </label>
                    </div>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3 text-text-muted text-[17px] pointer-events-none">
                        mail
                      </span>
                      <input
                        id="input-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (emailError) setEmailError(false);
                        }}
                        placeholder="nama@email.com"
                        className={`w-full h-9 sm:h-10 pl-9 pr-3 rounded-lg font-body-sm text-xs outline-none transition-all duration-150 ${emailError
                            ? 'bg-error-container/30 text-error focus:bg-error-container/40'
                            : 'bg-surface-container-low text-text-primary focus:bg-surface-card focus:shadow-sm'
                          }`}
                      />
                    </div>
                    {/* Email Warning Indicator (Error State) */}
                    {emailError && (
                      <p
                        className="mt-0.5 font-body-sm text-[11px] text-error flex items-center gap-1"
                        id="email-error-msg"
                      >
                        <span className="material-symbols-outlined text-[14px]">error</span>
                        <span>Email sudah terdaftar. Gunakan email lain atau masuk.</span>
                      </p>
                    )}
                  </div>

                  {/* Field: Password */}
                  <div>
                    <label
                      className="block font-label-md text-[11px] sm:text-xs text-on-surface mb-0.5"
                      htmlFor="input-password"
                    >
                      Kata Sandi
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3 text-text-muted text-[17px] pointer-events-none">
                        lock
                      </span>
                      <input
                        id="input-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Minimal 8 karakter"
                        className="w-full h-9 sm:h-10 pl-9 pr-9 rounded-lg bg-surface-container-low text-text-primary font-body-sm text-xs outline-none focus:bg-surface-card focus:shadow-sm transition-all duration-150"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 text-text-muted hover:text-on-surface flex items-center justify-center p-1"
                      >
                        <span className="material-symbols-outlined text-[17px]">
                          {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Field: Konfirmasi Password */}
                  <div>
                    <label
                      className="block font-label-md text-[11px] sm:text-xs text-on-surface mb-0.5"
                      htmlFor="input-confirm"
                    >
                      Konfirmasi Kata Sandi
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3 text-text-muted text-[17px] pointer-events-none">
                        lock
                      </span>
                      <input
                        id="input-confirm"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          if (confirmError) setConfirmError(false);
                        }}
                        placeholder="Ulangi kata sandi"
                        className={`w-full h-9 sm:h-10 pl-9 pr-9 rounded-lg font-body-sm text-xs outline-none transition-all duration-150 ${confirmError
                            ? 'bg-error-container/30 text-error focus:bg-error-container/40'
                            : 'bg-surface-container-low text-text-primary focus:bg-surface-card focus:shadow-sm'
                          }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2.5 text-text-muted hover:text-on-surface flex items-center justify-center p-1"
                      >
                        <span className="material-symbols-outlined text-[17px]">
                          {showConfirmPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                    {/* Confirm Password Error Indicator (Error State) */}
                    {confirmError && (
                      <p
                        className="mt-0.5 font-body-sm text-[11px] text-error flex items-center gap-1"
                        id="confirm-error-msg"
                      >
                        <span className="material-symbols-outlined text-[14px]">error</span>
                        <span>Password tidak sama. Ketik ulang agar keduanya sama.</span>
                      </p>
                    )}
                  </div>

                  {/* Guru Notice Amber Box */}
                  {role === 'guru' && (
                    <div
                      className="p-2.5 rounded-lg bg-[#FFFBEB] text-[#B45309] flex items-start gap-1.5 animate-fadeIn"
                      id="guru-notice-box"
                    >
                      <span
                        className="material-symbols-outlined text-status-warning text-[17px] shrink-0 mt-0.5"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        info
                      </span>
                      <p className="font-body-sm text-[11.5px] leading-relaxed">
                        Akun guru perlu disetujui admin sebelum bisa dipakai. Kamu akan bisa masuk
                        setelah disetujui.
                      </p>
                    </div>
                  )}

                  {/* Action Button: Buat Akun */}
                  <div className="pt-0.5">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-9.5 sm:h-10 rounded-lg bg-primary-container text-on-primary font-label-md text-xs sm:text-sm hover:bg-primary transition-all duration-150 shadow-sm flex items-center justify-center gap-2 active:scale-[0.99] font-semibold"
                    >
                      {isSubmitting ? (
                        <span>Mendaftarkan...</span>
                      ) : (
                        <>
                          <span>Buat akun</span>
                          <span className="material-symbols-outlined text-[16px]">
                            arrow_forward
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Google Registration */}
                <div className="relative my-3 text-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full h-px bg-surface-container-high"></div>
                  </div>
                  <span className="relative px-2.5 bg-surface-card font-label-sm text-[10px] text-text-muted">
                    ATAU
                  </span>
                </div>
                <button
                  type="button"
                  className="w-full h-9.5 sm:h-10 rounded-lg border border-surface-container-high bg-surface-card hover:bg-surface-container-low text-on-surface font-label-md text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <span className="font-bold text-base leading-none text-[#4285F4]">G</span>
                  <span>Daftar dengan Google</span>
                </button>

                {/* Footer Switch to Login */}
                <div className="mt-2.5 sm:mt-3 pt-2 text-center border-t border-surface-container-high/60">
                  <p className="font-body-sm text-xs text-text-muted">
                    Sudah punya akun?{' '}
                    <Link
                      to="/masuk"
                      className="font-label-md text-xs text-primary hover:underline ml-1 font-semibold"
                    >
                      Masuk
                    </Link>
                  </p>
                </div>
              </div>
            )}

            {/* ================= CARD 2: SUKSES PENDAFTARAN GURU ================= */}
            {viewState === 'success-guru' && (
              <div
                className="bg-surface-card rounded-xl p-6 sm:p-8 shadow-[0_4px_24px_-4px_rgba(15,42,92,0.08)] text-center flex flex-col items-center animate-fadeIn"
                id="success-guru-card"
              >
                <div className="w-14 h-14 rounded-full bg-status-success/15 text-status-success flex items-center justify-center mx-auto mb-3.5">
                  <span
                    className="material-symbols-outlined text-[32px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFBEB] text-[#B45309] font-label-sm text-xs mb-3">
                  <span className="material-symbols-outlined text-[15px]">hourglass_top</span>
                  <span>Menunggu Persetujuan</span>
                </div>
                <h2 className="font-headline-md text-xl font-bold text-on-surface mb-1.5">
                  Pendaftaran berhasil
                </h2>
                <p className="font-body-sm text-xs sm:text-sm text-text-muted mb-4 max-w-sm leading-relaxed">
                  Akunmu sedang menunggu persetujuan admin. Kami akan mengaktifkannya secepatnya.
                </p>

                <div className="w-full p-3.5 rounded-xl bg-surface-container-low text-left mb-4 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-muted">Peran Akun:</span>
                    <span className="font-label-md font-semibold text-on-surface">Guru</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-muted">Email Terdaftar:</span>
                    <span className="font-label-md font-semibold text-on-surface">{email}</span>
                  </div>
                </div>

                <Link
                  to="/masuk"
                  className="w-full h-10 sm:h-11 rounded-lg bg-primary-container text-on-primary font-label-md sm:font-label-lg text-xs sm:text-sm hover:bg-primary transition-all duration-150 shadow-sm flex items-center justify-center gap-2 font-semibold"
                >
                  <span className="material-symbols-outlined text-[17px]">arrow_back</span>
                  <span>Kembali ke halaman masuk</span>
                </Link>
              </div>
            )}

            {/* ================= CARD 3: SUKSES PENDAFTARAN MURID ================= */}
            {viewState === 'success-murid' && (
              <div
                className="bg-surface-card rounded-xl p-6 sm:p-8 shadow-[0_4px_24px_-4px_rgba(15,42,92,0.08)] text-center flex flex-col items-center animate-fadeIn"
                id="success-murid-card"
              >
                <div className="w-14 h-14 rounded-full bg-status-success/15 text-status-success flex items-center justify-center mx-auto mb-3.5">
                  <span
                    className="material-symbols-outlined text-[32px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-primary font-label-sm text-xs mb-3">
                  <span className="material-symbols-outlined text-[15px]">school</span>
                  <span>Akun Murid Aktif</span>
                </div>
                <h2 className="font-headline-md text-xl font-bold text-on-surface mb-1.5">
                  Akun berhasil dibuat
                </h2>
                <p className="font-body-sm text-xs sm:text-sm text-text-muted mb-4 max-w-sm leading-relaxed">
                  Sekarang kamu bisa masuk dan memasukkan token ujian.
                </p>

                <div className="w-full p-3.5 rounded-xl bg-surface-container-low text-left mb-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary text-on-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">vpn_key</span>
                  </div>
                  <div>
                    <p className="font-label-md text-xs sm:text-sm font-semibold text-on-surface">
                      Siapkan Token CBT
                    </p>
                    <p className="font-body-sm text-xs text-text-muted">
                      Minta 6 digit token ruang tes kepada guru pembimbing.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleMuridLoginNow}
                  className="w-full h-10 sm:h-11 rounded-lg bg-primary-container text-on-primary font-label-md sm:font-label-lg text-xs sm:text-sm hover:bg-primary transition-all duration-150 shadow-sm flex items-center justify-center gap-2 font-semibold"
                >
                  <span>Masuk sekarang</span>
                  <span className="material-symbols-outlined text-[17px]">login</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
