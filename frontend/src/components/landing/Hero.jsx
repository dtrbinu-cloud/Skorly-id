import Icon from '../ui/Icon';
import TokenCard from './TokenCard';
import { trustBadges } from '../../data/landing';

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-surface-canvas pt-10 pb-20">
      {/* Subtle Polygon Geometric Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg
          className="absolute top-0 right-0 w-[640px] h-[640px] text-surface-container"
          fill="currentColor"
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <polygon points="50,0 100,25 100,75 50,100 0,75 0,25"></polygon>
        </svg>
        <svg
          className="absolute bottom-10 left-[-80px] w-[420px] h-[420px] text-surface-container-high"
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-fixed text-primary font-label-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-status-success animate-pulse"></span>
              <span>CBT Platform Generasi Baru</span>
            </div>

            <h1 className="font-headline-xl text-[44px] md:text-[56px] text-on-surface tracking-tight font-extrabold leading-tight">
              Ujian Online.
              <br />
              <span className="text-primary-container">Nilai Instan.</span>
            </h1>

            <p className="font-body-lg text-body-lg text-text-muted max-w-xl leading-relaxed">
              Platform asesmen presisi bebas macet. Koreksi otomatis seketika dengan keamanan ujian terintegrasi.
            </p>

            <div className="flex flex-wrap items-center gap-space-md pt-3">
              <a
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-status-warning text-surface-card font-label-lg shadow-md hover:bg-tertiary-container transition-all active:scale-95 font-bold"
                href="#simulasi"
              >
                <Icon name="play_arrow" className="text-[20px]" />
                <span>Mulai Ujian</span>
              </a>
              <a
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-surface-card text-primary font-label-lg shadow-sm hover:bg-surface-container-low transition-all font-semibold"
                href="#fitur"
              >
                <span>Masuk Guru</span>
                <Icon name="arrow_forward" className="text-[18px]" />
              </a>
            </div>

            <div className="flex items-center gap-space-lg pt-4 text-text-muted font-label-sm">
              {trustBadges.map((badge) => (
                <div key={badge.label} className="flex items-center gap-1.5">
                  <Icon
                    name={badge.icon}
                    className="text-status-success text-[18px]"
                  />
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Hero Column: Interactive Token Simulation (5 Cols) */}
          <TokenCard />
        </div>
      </div>
    </section>
  );
}
