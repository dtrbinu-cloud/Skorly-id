import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth';

export default function Login() {
  const [screenState, setScreenState] = useState('default');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('budi.santoso@sekolah.sch.id');
  const [password, setPassword] = useState('RahasiaSekolah#2025');
  const [rememberMe, setRememberMe] = useState(true);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (screenState === 'loading') return;

    setScreenState('loading');

    setTimeout(() => {
      // Jika email mengandung "pending", tampilkan state pending
      if (email.toLowerCase().includes('pending')) {
        setScreenState('pending');
        return;
      }

      // Jika email salah atau sengaja error
      if (email.toLowerCase().includes('salah') || !email || !password) {
        setScreenState('error');
        return;
      }

      // Login default berhasil -> arahkan ke dashboard yang sesuai
      if (login) {
        const u = login(email);
        navigate('/' + (u?.role || 'murid'));
      } else {
        setScreenState('default');
      }
    }, 1000);
  };

  return (
    <main className="fixed inset-0 w-full h-screen max-h-screen bg-surface flex flex-col justify-stretch overflow-hidden">
      <div className="h-full w-full flex flex-col lg:flex-row bg-surface-canvas font-body-md text-on-surface overflow-hidden">
        {/* LEFT BRAND COLUMN (50% on desktop) */}
        <div className="relative hidden lg:flex w-full lg:w-1/2 bg-primary text-on-primary flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12 overflow-hidden h-full">
          {/* Faint Geometric / Hexagon Motif Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <svg
              className="w-full h-full object-cover"
              fill="none"
              height="900"
              width="800"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  height="104"
                  id="hex-pattern"
                  patternTransform="scale(1.2)"
                  patternUnits="userSpaceOnUse"
                  width="60"
                >
                  <path
                    className="text-on-primary"
                    d="M30 0 L60 17.32 L60 52 L30 69.28 L0 52 L0 17.32 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  ></path>
                  <path
                    className="text-on-primary"
                    d="M30 52 L60 69.32 L60 104 L30 121.28 L0 104 L0 69.32 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  ></path>
                  <circle
                    className="text-on-primary"
                    cx="30"
                    cy="17.32"
                    fill="currentColor"
                    r="2.5"
                  ></circle>
                  <circle
                    className="text-on-primary"
                    cx="0"
                    cy="69.28"
                    fill="currentColor"
                    r="2.5"
                  ></circle>
                  <circle
                    className="text-on-primary"
                    cx="60"
                    cy="69.28"
                    fill="currentColor"
                    r="2.5"
                  ></circle>
                </pattern>
              </defs>
              <rect fill="url(#hex-pattern)" height="100%" width="100%"></rect>
            </svg>
          </div>

          {/* Ambient Glow Accents */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary-container/40 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 right-0 w-80 h-80 bg-tertiary-fixed-dim/20 rounded-full blur-3xl pointer-events-none"></div>

          {/* Top Branding: Logo Skorly.id */}
          <div className="relative z-10 flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
              <div className="w-10 h-10 xl:w-11 xl:h-11 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shadow-md">
                <span
                  className="material-symbols-outlined text-[24px] xl:text-[26px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
              </div>
              <div className="flex items-baseline tracking-tight font-headline-md text-headline-md text-on-primary">
                <span>Skorly</span>
                <span className="text-tertiary-fixed font-headline-md text-headline-md font-bold">
                  .id
                </span>
              </div>
            </Link>
          </div>

          {/* Vertically Centered Core Value Proposition */}
          <div className="relative z-10 flex-1 w-full flex items-center justify-end pb-2 xl:pb-4">
            <img
              src="/assets/login-illustration-source.png"
              alt="Ilustrasi login Skorly"
              className="auth-illustration login-auth-illustration w-full max-w-[760px] h-auto max-h-[540px] object-contain"
            />
          </div>

        </div>

        {/* RIGHT FORM COLUMN (50% on desktop) */}
        <div className="w-full lg:w-1/2 bg-surface-canvas flex flex-col justify-start items-center p-5 sm:p-6 lg:p-8 h-full overflow-y-auto">
          <div className="w-full max-w-[420px] my-auto py-2 sm:py-4">
          {/* Mobile Brand Header */}
          <div className="flex lg:hidden items-center space-x-2.5 mb-4">
            <Link to="/" className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
              </div>
              <div className="flex items-baseline tracking-tight font-headline-md text-headline-md text-primary font-bold">
                <span>Skorly</span>
                <span className="text-tertiary-fixed font-bold">.id</span>
              </div>
            </Link>
          </div>

          {/* Login Card Container */}
          <div className="w-full max-w-[420px] bg-surface-card rounded-xl p-4 sm:p-7 shadow-[0_4px_24px_-4px_rgba(15,42,92,0.08)]">
            {/* Header */}
            <div className="mb-3 sm:mb-5">
              <h2 className="font-headline-md text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                Masuk ke Skorly.id
              </h2>
              <p className="font-body-sm text-xs sm:text-sm text-text-muted mt-0.5">
                Gunakan email dan password akunmu.
              </p>
            </div>

            {/* Dynamic State Banners */}
            {/* 1. Error Banner */}
            {screenState === 'error' && (
              <div
                className="mb-3.5 p-3 rounded-lg bg-[#FEF2F2] text-[#991B1B] shadow-xs"
                id="banner-error"
              >
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[18px] text-error shrink-0 mt-0.5">
                    error
                  </span>
                  <div className="font-body-sm text-xs sm:text-sm text-[#991B1B] leading-snug">
                    Email atau password salah. Periksa lagi lalu coba masuk kembali.
                  </div>
                </div>
              </div>
            )}

            {/* 2. Pending Teacher Banner */}
            {screenState === 'pending' && (
              <div
                className="mb-3.5 p-3 rounded-lg bg-[#FFFBEB] text-[#92400E] shadow-xs"
                id="banner-pending"
              >
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[18px] text-status-warning shrink-0 mt-0.5">
                    hourglass_top
                  </span>
                  <div className="font-body-sm text-xs sm:text-sm text-[#92400E] leading-snug">
                    Akunmu sedang menunggu verifikasi admin. Kamu bisa masuk setelah disetujui.
                  </div>
                </div>
              </div>
            )}

            {/* Login Form */}
            <form className="space-y-3 sm:space-y-4" noValidate onSubmit={handleFormSubmit}>
              {/* Email Input Group */}
              <div>
                <label
                  className="block font-label-md text-xs sm:text-sm text-text-primary mb-1"
                  htmlFor="email-input"
                >
                  Alamat Email
                </label>
                <div className="relative rounded-lg overflow-hidden">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-outline">
                    <span className="material-symbols-outlined text-[18px]">mail</span>
                  </div>
                  <input
                    id="email-input"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (screenState === 'error') setScreenState('default');
                    }}
                    placeholder="nama@email.com"
                    className={`w-full h-10 sm:h-11 pl-10 pr-4 font-body-sm text-xs sm:text-sm rounded-lg transition-colors outline-none focus:bg-surface-container-lowest ${
                      screenState === 'error'
                        ? 'bg-error-container text-error'
                        : 'bg-surface-container-low focus:bg-surface-card text-text-primary'
                    }`}
                  />
                </div>
                {screenState === 'error' && (
                  <p
                    className="mt-1 font-body-sm text-xs text-error"
                    id="email-error-hint"
                  >
                    Format email tidak valid atau belum terdaftar
                  </p>
                )}
              </div>

              {/* Password Input Group */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label
                    className="font-label-md text-xs sm:text-sm text-text-primary"
                    htmlFor="password-input"
                  >
                    Kata Sandi
                  </label>
                  <a
                    className="font-label-sm text-xs text-primary hover:text-primary-container transition-colors"
                    href="#"
                  >
                    Lupa sandi?
                  </a>
                </div>
                <div className="relative rounded-lg overflow-hidden">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-outline">
                    <span className="material-symbols-outlined text-[18px]">lock</span>
                  </div>
                  <input
                    id="password-input"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (screenState === 'error') setScreenState('default');
                    }}
                    placeholder="Minimal 8 karakter"
                    className="w-full h-10 sm:h-11 pl-10 pr-10 bg-surface-container-low focus:bg-surface-card text-text-primary font-body-sm text-xs sm:text-sm rounded-lg transition-colors outline-none focus:bg-surface-container-lowest"
                  />
                  <button
                    id="toggle-password-btn"
                    type="button"
                    aria-label="Tampilkan atau sembunyikan kata sandi"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-on-surface-variant transition-colors justify-center"
                  >
                    <span
                      className="material-symbols-outlined text-[18px]"
                      id="password-visibility-icon"
                    >
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between pt-0.5">
                <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded text-primary focus:ring-0 cursor-pointer accent-primary"
                  />
                  <span className="font-body-sm text-xs sm:text-sm text-on-surface-variant">
                    Ingat saya di perangkat ini
                  </span>
                </label>
                <span className="inline-flex items-center gap-1 font-label-sm text-[11px] sm:text-xs text-status-success">
                  <span className="material-symbols-outlined text-[14px]">verified_user</span>
                  SSO Aktif
                </span>
              </div>

              {/* Submit Button */}
              <div className="pt-1">
                <button
                  id="submit-btn"
                  type="submit"
                  disabled={screenState === 'loading'}
                  className={`w-full h-10 sm:h-11 bg-primary-container hover:bg-primary active:scale-[0.99] text-on-primary font-label-md sm:font-label-lg text-xs sm:text-sm rounded-lg flex items-center justify-center gap-2 shadow-md transition-all font-semibold ${
                    screenState === 'loading' ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {screenState === 'loading' ? (
                    <>
                      <svg
                        id="btn-spinner"
                        className="animate-spin h-4 w-4 text-on-primary"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span id="btn-label">Memproses...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]" id="btn-login-icon">
                        login
                      </span>
                      <span id="btn-label">Masuk</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Google Login */}
            <div className="relative my-3 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-surface-container-high"></div>
              </div>
              <span className="relative px-2.5 bg-surface-card font-label-sm text-[11px] text-text-muted">
                ATAU
              </span>
            </div>
            <button
              type="button"
              className="w-full h-10 px-3.5 rounded-lg border border-surface-container-high bg-surface-card hover:bg-surface-container-low flex items-center justify-center gap-2 text-on-surface font-label-md text-xs sm:text-sm transition-colors"
            >
              <span className="font-bold text-base leading-none text-[#4285F4]">G</span>
              <span>Lanjutkan dengan Google</span>
            </button>

            {/* Room Token Quick Entry Divider */}
            <div className="relative my-3 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-surface-container-high"></div>
              </div>
              <span className="relative px-2.5 bg-surface-card font-label-sm text-[11px] text-text-muted">
                ATAU PUNYA TOKEN RUANG?
              </span>
            </div>

            {/* Token Entry Quick Action */}
            <Link
              to="/#simulasi"
              className="w-full h-10 px-3.5 rounded-lg bg-surface-container-low hover:bg-surface-container flex items-center justify-between text-on-surface-variant font-label-md text-xs sm:text-sm transition-colors"
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[17px] text-tertiary">key</span>
                <span>Masuk Langsung dengan Token Soal</span>
              </span>
              <span className="material-symbols-outlined text-[17px]">arrow_forward</span>
            </Link>

            {/* Footer Card Link */}
            <div className="text-center mt-3">
              <p className="font-body-sm text-xs sm:text-sm text-text-muted">
                Belum punya akun?{' '}
                <Link
                  to="/daftar"
                  className="font-label-md text-xs sm:text-sm text-primary hover:text-primary-container font-semibold transition-colors"
                >
                  Daftar sekarang
                </Link>
              </p>
            </div>
          </div>

          {/* Trust Badges & Help Center */}
          <div className="w-full max-w-[420px] flex items-center justify-between text-text-muted font-body-sm text-xs mt-1 sm:mt-4 px-2">
            <a className="hover:text-primary transition-colors flex items-center gap-1" href="#">
              <span className="material-symbols-outlined text-[15px]">help_outline</span>
              Pusat Bantuan
            </a>
            <span className="text-surface-container-highest">•</span>
            <a className="hover:text-primary transition-colors" href="#">
              Panduan Guru
            </a>
            <span className="text-surface-container-highest">•</span>
            <a className="hover:text-primary transition-colors" href="#">
              Status Server
            </a>
          </div>
          </div>
        </div>
      </div>
    </main>
  );
}
