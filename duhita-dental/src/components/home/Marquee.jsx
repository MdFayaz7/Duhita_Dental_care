import { marquee } from '../../data/content';

export default function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <section className="relative border-y border-white/[0.07] bg-black py-5">
      <div className="edge-fade overflow-hidden">
        <div className="anim-marquee flex w-max items-center gap-10 whitespace-nowrap">
          {items.map((label, i) => (
            <span key={`${label}-${i}`} className="flex items-center gap-10">
              <span className="type-caption font-medium uppercase tracking-[0.14em] text-mute-2 transition-colors hover:text-chalk">
                {label}
              </span>
              <span className="h-1 w-1 rounded-full bg-brand-cyan/50" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
