import { useOutletContext } from 'react-router-dom';
import { about, pillars, site, stats, timeline } from '../data/content';
import { images } from '../data/assets';
import PageHero from '../components/layout/PageHero';
import AppointmentCTA from '../components/home/AppointmentCTA';
import GoogleReviews from '../components/home/GoogleReviews';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import LazyImage from '../components/ui/LazyImage';

export default function AboutPage() {
  const { onOpenBooking } = useOutletContext();

  return (
    <>
      <PageHero
        eyebrow={about.eyebrow}
        title={about.title}
        subtitle={`${site.fullName} — serving Vijayawada since ${site.established}.`}
      />

      <section className="bg-black pb-24 md:pb-32">
        <div className="shell">
          <Reveal from="scale">
            <div className="relative overflow-hidden rounded-[32px] border border-white/[0.1]">
              <LazyImage
                src={images.faq}
                alt={site.fullName}
                wrapperClassName="aspect-[16/9] w-full"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.25),transparent_40%,rgba(0,0,0,0.85))]" />
              <div className="absolute inset-x-6 bottom-6 md:inset-x-10 md:bottom-10">
                <p className="type-intro max-w-2xl text-chalk/90">{about.body}</p>
              </div>
            </div>
          </Reveal>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.055] to-white/[0.01] p-7 text-center">
                  <p className="display-3 text-white">
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="type-caption mt-2 font-medium tracking-[0.06em] text-mute-2">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#04050a] py-24 md:py-32">
        <div className="shell">
          <SectionHeading
            align="left"
            eyebrow="How We Work"
            title="Four steps, every single case."
            className="max-w-2xl"
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="h-full rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.055] to-white/[0.01] p-7">
                  <span className="type-caption font-semibold tracking-[0.06em] text-brand-cyan">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 text-[21px] font-semibold leading-[1.19048] tracking-[-0.01em] text-white">{p.title}</h3>
                  <p className="type-body mt-2.5 text-mute">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-24 md:py-32">
        <div className="shell max-w-3xl">
          <SectionHeading align="left" eyebrow="Milestones" title="Twenty-eight years, in order." />
          <div className="mt-14 border-l border-white/[0.1] pl-8">
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.08} className="relative pb-12 last:pb-0">
                <span className="absolute -left-[41px] top-1.5 grid h-5 w-5 place-items-center rounded-full border border-brand-cyan/40 bg-black">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
                </span>
                <span className="type-caption font-semibold tracking-[0.06em] text-brand-cyan">{t.year}</span>
                <h3 className="mt-2 text-[24px] font-semibold leading-[1.16] tracking-[-0.01em] text-white">{t.title}</h3>
                <p className="type-body mt-2 text-mute">{t.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <GoogleReviews />
      <AppointmentCTA onOpenBooking={onOpenBooking} />
    </>
  );
}
