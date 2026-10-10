import Icon from '../ui/Icon';

export default function CtaBanner() {
  return (
    <section className="w-full py-16 bg-primary text-surface-card relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg
          className="w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <polygon fill="currentColor" points="0,0 100,0 80,100 0,100"></polygon>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-margin-desktop relative z-10 flex flex-col md:flex-row items-center justify-between gap-space-xl">
        <div className="max-w-2xl flex flex-col gap-space-sm text-left">
          <span className="font-label-md text-label-md uppercase tracking-wider text-secondary-container font-bold">
            Siap Menyelenggarakan Semester Ini?
          </span>
          <h2 className="font-headline-xl text-headline-xl text-surface-card font-extrabold">
            Jadikan Ujian Sekolah Tanpa Beban Cetak Kertas
          </h2>
          <p className="font-body-lg text-body-lg text-secondary-container">
            Bergabunglah bersama 120+ institusi pendidikan di seluruh Indonesia yang telah beralih ke asesmen presisi Skorly.id.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-space-md shrink-0">
          <a
            className="px-8 py-4 rounded-lg bg-status-warning text-surface-card font-label-lg text-label-lg font-bold shadow-lg hover:bg-tertiary-container transition-all"
            href="#simulasi"
          >
            Daftarkan Sekolah Saya
          </a>
          <a
            className="px-6 py-4 rounded-lg bg-surface-card/10 text-surface-card font-label-lg text-label-lg hover:bg-surface-card/20 transition-all flex items-center gap-2"
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="chat" className="text-[20px]" />
            <span>Konsultasi via WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
