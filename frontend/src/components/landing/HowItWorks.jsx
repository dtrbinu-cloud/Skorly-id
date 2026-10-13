import { stepsData } from '../../data/landing';

export default function HowItWorks() {
  return (
    <section className="workflow-steps w-full py-20 lg:py-24" id="cara-kerja">
      <div className="max-w-7xl mx-auto px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.35fr] gap-12 lg:gap-20 items-center">
          <div className="workflow-intro">
            <p className="workflow-eyebrow">MUDAH DIGUNAKAN</p>
            <h2 className="workflow-heading">
              Tiga langkah menuju soal
              <br className="hidden sm:block" /> siap pakai
            </h2>
            <p className="workflow-lead">
              Tidak perlu belajar sistem baru. Alurnya dibuat agar guru bisa
              langsung mulai.
            </p>
            <a className="workflow-cta" href="/daftar">
              Buat ruang ujian <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="workflow-list">
            {stepsData.map((item) => (
              <div className="step-row" key={item.step}>
                <span className={`step-number ${item.step === '3' ? 'is-last' : ''}`}>
                  {item.step}
                </span>
                <div className="step-copy">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
