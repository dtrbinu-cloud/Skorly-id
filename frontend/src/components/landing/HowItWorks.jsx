import Icon from '../ui/Icon';
import SectionHeading from '../ui/SectionHeading';
import { stepsData } from '../../data/landing';

export default function HowItWorks() {
  return (
    <section className="workflow-steps w-full py-20 text-surface-card" id="cara-kerja">
      <div className="max-w-7xl mx-auto px-margin-desktop flex flex-col gap-space-2xl">
        <SectionHeading
          eyebrow="Alur Kerja Cepat"
          title="Tiga langkah menuju soal siap pakai"
          description="Tidak perlu belajar sistem baru. Alurnya dibuat agar guru bisa langsung mulai."
          align="center"
        />

        {/* Horizontal Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop relative pt-6">
          {stepsData.map((item) => (
            <div
              key={item.step}
              className="step-row p-space-xl rounded-xl flex flex-col gap-space-md md:flex-row md:items-center"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`step-badge w-9 h-9 rounded-full ${item.badgeBg} text-surface-card font-headline-sm flex items-center justify-center font-bold text-[16px] shrink-0`}
                >
                  {item.step}
                </span>
                <Icon
                  name={item.icon}
                  className="step-icon text-[24px]"
                />
              </div>
              <div>
                <h3 className="font-headline-md text-headline-sm font-bold step-title">
                  {item.title}
                </h3>
                <p className="font-body-sm text-body-sm step-description mt-1">
                  {item.description}
                </p>
              </div>
              <div className={`mt-auto text-label-sm font-semibold ${item.durationColor}`}>
                {item.duration}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
