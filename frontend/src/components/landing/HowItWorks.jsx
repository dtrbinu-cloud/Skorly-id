import Icon from '../ui/Icon';
import SectionHeading from '../ui/SectionHeading';
import { stepsData } from '../../data/landing';

export default function HowItWorks() {
  return (
    <section className="w-full py-20 bg-surface-card" id="cara-kerja">
      <div className="max-w-7xl mx-auto px-margin-desktop flex flex-col gap-space-2xl">
        <SectionHeading
          eyebrow="Alur Kerja Cepat"
          title="3 Langkah Menyelenggarakan Ujian"
          description="Tanpa instalasi server lab komputer, tanpa kabel LAN rumit."
          align="center"
        />

        {/* Horizontal Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop relative pt-6">
          {stepsData.map((item) => (
            <div
              key={item.step}
              className="p-space-xl rounded-xl bg-surface-container-low flex flex-col gap-space-md"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`w-9 h-9 rounded-full ${item.badgeBg} text-surface-card font-headline-sm flex items-center justify-center font-bold text-[16px]`}
                >
                  {item.step}
                </span>
                <Icon
                  name={item.icon}
                  className="text-text-muted text-[24px]"
                />
              </div>
              <div>
                <h3 className="font-headline-md text-headline-sm font-bold text-on-surface">
                  {item.title}
                </h3>
                <p className="font-body-sm text-body-sm text-text-muted mt-1">
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
