import Icon from '../ui/Icon';
import { footerColumns, footerContact } from '../../data/landing';

export default function Footer() {
  return (
    <>
      {/* FOOTER INTERNAL EXTENSION */}
      <footer className="w-full bg-surface-card py-12 border-t border-surface-container-high/40">
        <div className="max-w-7xl mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-gutter-desktop">
          <div className="flex flex-col gap-space-sm md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary text-surface-card flex items-center justify-center">
                <Icon name="verified" className="text-[18px]" />
              </div>
              <span className="font-headline-sm text-headline-sm text-primary font-bold">
                Skorly.id
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-text-muted mt-2">
              Platform ujian Computer-Based Testing (CBT) berbasis web ringan untuk sekolah, madrasah, dan perguruan tinggi vokasi di Indonesia.
            </p>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title} className="flex flex-col gap-space-sm">
              <span className="font-label-lg text-label-lg text-on-surface font-bold">
                {col.title}
              </span>
              {col.links.map((link) => (
                <a
                  key={link.label}
                  className="font-body-sm text-body-sm text-text-muted hover:text-primary transition-colors"
                  href={link.href}
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}

          <div className="flex flex-col gap-space-sm">
            <span className="font-label-lg text-label-lg text-on-surface font-bold">
              Kontak Pengembang
            </span>
            <span className="font-body-sm text-body-sm text-text-muted">
              {footerContact.address}
            </span>
            <span className="font-body-sm text-body-sm text-text-muted font-semibold mt-1">
              Surel: {footerContact.email}
            </span>
            <span className="font-body-sm text-body-sm text-text-muted">
              Layanan Hotline: {footerContact.phone}
            </span>
          </div>
        </div>
      </footer>

      {/* COPYRIGHT & SYSTEM STATUS BAR */}
      <footer className="w-full bg-surface-card py-space-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-t border-surface-container-high/60">
        <div className="max-w-7xl mx-auto px-margin-desktop flex flex-col md:flex-row items-center justify-between gap-space-md text-text-muted font-body-sm text-body-sm">
          <div className="flex items-center gap-space-sm">
            <span className="font-headline-sm text-headline-sm text-primary font-bold">
              Skorly.id
            </span>
            <span>© 2025 Skorly Asesmen Nusantara. Hak Cipta Dilindungi.</span>
          </div>
          <div className="flex items-center gap-space-lg">
            <span className="flex items-center gap-1">
              <Icon
                name="lock"
                className="text-[16px] text-status-success"
              />
              <span>Enkripsi 256-bit</span>
            </span>
            <span className="flex items-center gap-1">
              <Icon
                name="bolt"
                className="text-[16px] text-primary"
              />
              <span>Proctoring Sinkron</span>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
