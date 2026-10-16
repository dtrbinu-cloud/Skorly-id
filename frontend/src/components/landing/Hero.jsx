import Icon from '../ui/Icon';
import { trustBadges } from '../../data/landing';

export default function Hero() {
  return (
    <section
      id="beranda"
      className="landing-hero relative w-full min-h-screen overflow-hidden pt-12 pb-20 md:pt-16 md:pb-24"
      style={{ background: '#f3f6fb', paddingTop: '180px' }}
    >
      {/* Subtle Polygon Geometric Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg
          className="absolute top-0 right-0 w-[720px] h-[720px] text-surface-container"
          fill="currentColor"
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <polygon points="50,0 100,25 100,75 50,100 0,75 0,25"></polygon>
        </svg>
        <svg
          className="absolute bottom-10 left-[-80px] w-[480px] h-[480px] text-surface-container-high"
          fill="currentColor"
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <polygon points="25,0 75,0 100,50 75,100 25,100 0,50"></polygon>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-margin-desktop">
        <div className="grid grid-cols-12 gap-gutter-desktop items-center">
          {/* Left Hero Column (7 Cols) */}
          <div className="col-span-12 lg:col-span-7 flex flex-col items-start gap-space-lg">
            <h1 className="font-headline-xl text-[42px] md:text-[64px] text-on-surface tracking-[-0.04em] font-extrabold leading-[1.05]">
              Dari soal,
              <br />
              <span className="text-primary-container">langsung jadi nilai.</span>
            </h1>

            <p className="font-body-lg text-body-lg text-text-muted max-w-xl leading-relaxed text-[17px]">
              Guru menyiapkan ujian dalam satu ruang. Murid masuk dengan token. Jawaban dinilai otomatis dan hasilnya langsung siap dibaca.
            </p>

            <div className="flex flex-wrap items-center gap-space-md pt-2">
              <a
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-surface-card font-label-lg shadow-md hover:bg-primary-container transition-all active:scale-95 font-bold"
                href="/daftar"
              >
                <Icon name="add_circle" className="text-[20px]" />
                <span>Buat ruang ujian</span>
              </a>
              <a
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-status-warning text-surface-card font-label-lg shadow-sm hover:bg-tertiary-container transition-all font-bold"
                href="#cara"
              >
                <Icon name="key" className="text-[19px]" />
                <span>Masuk dengan token</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-space-lg gap-y-2 pt-4 text-text-muted font-label-sm">
              {trustBadges.map((badge) => {
                const BadgeIcon = badge.icon;
                return (
                  <div key={badge.label} className="inline-flex items-center gap-2">
                    {typeof BadgeIcon === 'function' ? (
                      <BadgeIcon
                        size={20}
                        className="text-status-success flex-none"
                      />
                    ) : (
                      <Icon
                        name={badge.icon}
                        className="text-status-success text-[20px] flex-none"
                      />
                    )}
                    <span>{badge.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Hero Column: Interactive Token Simulation (5 Cols) */}
          <div className="col-span-12 lg:col-span-5">
            <div className="hero-image-wrap">
              <img
                className="hero-image"
                src="/assets/skorly-hero-transparent-v2.png"
                alt="Guru dan murid menggunakan ilustrasi pembelajaran digital Skorly"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
