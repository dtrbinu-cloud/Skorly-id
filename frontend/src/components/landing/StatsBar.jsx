import Icon from '../ui/Icon';
import SectionHeading from '../ui/SectionHeading';
import { statsData } from '../../data/landing';

export default function StatsBar() {
  return (
    <section id="keunggulan" className="w-full bg-surface-card py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-margin-desktop flex flex-col gap-space-2xl">
        <SectionHeading
          eyebrow="Keunggulan utama"
          title="Dibuat Ringkas, Fokus pada Pembelajaran"
          description="Tanpa instalasi server lab yang rumit. Murid cukup buka browser di ponsel atau komputer."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop">
          {statsData.map((stat) => (
            <div
              key={stat.title}
              className="p-9 rounded-2xl bg-surface-canvas border border-surface-container-high flex flex-col min-h-[345px]"
            >
              <div
                className={`w-14 h-14 rounded-xl ${stat.iconBg} text-surface-card flex items-center justify-center shrink-0 shadow-md`}
              >
                {typeof stat.icon === 'function' ? (
                  <stat.icon size={24} className="flex-none" />
                ) : (
                  <Icon name={stat.icon} className="text-[24px]" />
                )}
              </div>
              <div className="flex flex-col flex-1 mt-7">
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                  {stat.title}
                </h3>
                <p className="font-body-lg text-body-lg text-secondary mt-2 leading-relaxed">
                  {stat.description}
                </p>
              </div>
              <div className="pt-5 border-t border-surface-container-high flex items-center gap-1.5 text-primary font-label-md font-bold">
                <span>{stat.action}</span>
                <Icon name="arrow_forward" className="text-[18px]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
