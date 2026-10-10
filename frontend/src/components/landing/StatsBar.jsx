import Icon from '../ui/Icon';
import { statsData } from '../../data/landing';

export default function StatsBar() {
  return (
    <section className="w-full bg-surface-card py-space-xl shadow-sm relative z-10">
      <div className="max-w-7xl mx-auto px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop">
          {statsData.map((stat) => (
            <div
              key={stat.label}
              className="p-space-lg rounded-xl bg-surface-container-low flex items-center gap-space-lg"
            >
              <div
                className={`w-12 h-12 rounded-xl ${stat.iconBg} text-surface-card flex items-center justify-center shrink-0 shadow-sm`}
              >
                <Icon name={stat.icon} className="text-[24px]" />
              </div>
              <div className="flex flex-col">
                <span className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight">
                  {stat.value}
                </span>
                <span className="font-label-md text-text-muted font-semibold uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
