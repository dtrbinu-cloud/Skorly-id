import Icon from '../ui/Icon';
import { navLinks } from '../../data/landing';

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface-card/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 max-w-7xl mx-auto px-margin-desktop flex items-center justify-between">
        <div className="flex items-center gap-space-lg">
          <div className="flex items-center gap-space-sm">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-on-primary shadow-sm">
              <Icon name="verified" className="text-[20px]" />
            </div>
            <div>
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight font-bold block">
                Skorly<span className="text-tertiary-container">.id</span>
              </span>
              <span className="font-label-sm text-label-sm text-text-muted uppercase tracking-wider block">
                Soal dan Nilai Otomatis
              </span>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-low">
            <span className="w-2 h-2 rounded-full bg-status-success"></span>
            <span className="font-label-md text-label-md text-on-surface font-semibold">
              Siap Digunakan
            </span>
          </div>
        </div>

        <nav
          className="hidden lg:flex items-center gap-space-md"
          data-active-classes="bg-primary-container text-on-primary font-bold rounded-lg"
          aria-label="Navigasi Utama"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-current={link.active ? 'page' : undefined}
              className={
                link.active
                  ? 'px-3.5 py-1.5 transition-colors bg-primary-container text-on-primary font-semibold rounded-lg text-body-sm'
                  : 'px-3 py-1.5 rounded-lg text-on-surface-variant font-semibold text-body-sm hover:text-on-surface hover:bg-surface-container-high transition-colors'
              }
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="/masuk" className="hidden sm:inline-flex px-4 py-2 rounded-lg text-primary font-label-lg font-bold hover:bg-surface-container-low transition-colors">
            Masuk
          </a>
          <a href="/daftar" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-on-primary font-label-lg font-bold shadow-sm hover:bg-primary-container transition-colors">
            Buat ruang
            <Icon name="arrow_forward" className="text-[17px]" />
          </a>
        </div>
      </div>
    </header>
  );
}
