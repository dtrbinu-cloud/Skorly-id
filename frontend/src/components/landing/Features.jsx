import Icon from '../ui/Icon';
import SectionHeading from '../ui/SectionHeading';
import { featuresData } from '../../data/landing';

export default function Features() {
  return (
    <section className="w-full py-20 bg-surface-canvas relative" id="fitur">
      <div className="max-w-7xl mx-auto px-margin-desktop flex flex-col gap-space-2xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <SectionHeading
            eyebrow="Keahlian Praktis Pengajar"
            title="Fitur Andalan Guru Modern"
            description="Didesain bersama puluhan guru SMK dan SMA di Jawa Timur demi efisiensi kerja tanpa pelatihan rumit."
            className="max-w-2xl"
          />
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface font-label-md text-label-md">
              Tampilan Web Desktop Khusus Pengawas
            </span>
          </div>
        </div>

        {/* 4-Card Desktop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop">
          {featuresData.map((item) => (
            <div
              key={item.title}
              className="p-space-xl rounded-xl bg-surface-card shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="flex flex-col gap-3">
                <div className="w-11 h-11 rounded-lg bg-surface-container-high text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-surface-card transition-colors">
                  <Icon name={item.icon} className="text-[22px]" />
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  {item.title}
                </h3>
                <p className="font-body-sm text-body-sm text-text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-primary font-label-sm font-semibold">
                <span>{item.badgeText}</span>
                <Icon name="arrow_forward" className="text-[16px]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
