import { FiMapPin, FiClock, FiPhone, FiMail } from 'react-icons/fi';
import { site } from '../../data/content';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

const items = [
  { icon: FiMapPin, label: 'Clinic address', value: site.address },
  { icon: FiClock, label: 'Opening hours', value: `${site.hours.morning} · ${site.hours.evening}` },
  { icon: FiPhone, label: 'Phone', value: site.phoneDisplay, href: `tel:${site.phone}` },
  { icon: FiMail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
];

export default function MapSection() {
  return (
    <section id="contact" className="relative bg-black py-24 md:py-32">
      <div className="shell">
        <SectionHeading
          align="left"
          eyebrow="Visit Us"
          title="Benz Circle, Vijayawada."
          subtitle="Walk in during clinic hours or reserve a slot online and skip the wait entirely."
          className="max-w-2xl"
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {items.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.07}>
                <a
                  href={item.href || site.social.google}
                  target={item.href ? undefined : '_blank'}
                  rel="noreferrer"
                  className="group flex h-full items-start gap-4 rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6 transition-all duration-600 hover:-translate-y-0.5 hover:border-white/20"
                >
                  <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-brand-primary/15 text-brand-cyan ring-1 ring-brand-primary/25">
                    <item.icon size={17} />
                  </span>
                  <span className="min-w-0">
                    <span className="type-caption block font-semibold tracking-[0.06em] text-mute-2">
                      {item.label}
                    </span>
                    <span className="type-body mt-1.5 block text-chalk">{item.value}</span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal from="left">
            <div className="relative h-full min-h-[420px] overflow-hidden rounded-[28px] border border-white/[0.1] bg-white/[0.02] p-2">
              <iframe
                title="Duhita Dental location"
                src={site.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full min-h-[404px] w-full rounded-[22px] border-0 grayscale-[0.35] invert-[0.92] hue-rotate-180 contrast-[0.9]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
