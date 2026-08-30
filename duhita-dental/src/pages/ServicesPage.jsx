import { useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FiCheck, FiCalendar, FiPhone } from 'react-icons/fi';
import { services, serviceGroups } from '../data/services';
import { site } from '../data/content';
import PageHero from '../components/layout/PageHero';
import ServiceMedia from '../components/services/ServiceMedia';
import AppointmentCTA from '../components/home/AppointmentCTA';
import Reveal from '../components/ui/Reveal';

export default function ServicesPage() {
  const { onOpenBooking } = useOutletContext();
  const [filter, setFilter] = useState('all');

  const visible = useMemo(
    () => (filter === 'all' ? services : services.filter((s) => s.group === filter)),
    [filter],
  );

  return (
    <>
      <PageHero
        eyebrow="Specialities"
        title="Every treatment, in detail."
        subtitle="Fifteen specialist treatments across eight departments, each one shown exactly as it happens in the chair."
      >
        <button
          type="button"
          onClick={() => onOpenBooking?.()}
          className="type-cta inline-flex items-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-white transition-colors duration-300 hover:bg-[#3b9bff]"
        >
          <FiCalendar size={16} /> Book a consultation
        </button>
        <a
          href={`tel:${site.phone}`}
          className="type-cta inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-6 py-3 text-chalk transition-colors duration-300 hover:bg-white/[0.16]"
        >
          <FiPhone size={16} /> {site.phoneDisplay}
        </a>
      </PageHero>

      <section className="sticky top-16 z-30 border-y border-white/[0.07] bg-black/80 backdrop-blur-2xl md:top-[68px]">
        <div className="shell hide-scroll flex gap-2 overflow-x-auto py-3.5">
          {[{ id: 'all', name: 'All' }, ...serviceGroups].map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setFilter(g.id)}
              className={`shrink-0 rounded-full border px-4 py-2 text-[14px] tracking-[-0.01em] transition-all duration-400 ${
                filter === g.id
                  ? 'border-white/25 bg-white text-black'
                  : 'border-white/10 text-mute hover:border-white/25 hover:text-white'
              }`}
            >
              {g.name}
            </button>
          ))}
        </div>
      </section>

      <div className="bg-black">
        {visible.map((service, i) => {
          const group = serviceGroups.find((g) => g.id === service.group);
          const flip = i % 2 === 1;
          return (
            <section
              key={service.id}
              id={service.id}
              className="relative scroll-mt-40 py-14 md:py-20"
            >
              <div className="shell">
                <div
                  className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                    flip ? 'lg:[&>*:first-child]:order-2' : ''
                  }`}
                >
                  <Reveal from={flip ? 'left' : 'right'}>
                    <div className="group relative">
                      <div
                        className="pointer-events-none absolute -inset-8 rounded-[52px] blur-2xl"
                        style={{ background: `radial-gradient(closest-side, ${group?.accent}2e, transparent)` }}
                      />
                      <ServiceMedia
                        service={service}
                        priority={i < 2}
                        className="relative aspect-square w-full rounded-[32px] shadow-[0_40px_100px_-45px_rgba(0,0,0,1)] md:aspect-[5/4]"
                      />
                    </div>
                  </Reveal>

                  <Reveal from={flip ? 'right' : 'left'} delay={0.1}>
                    <span
                      className="type-caption font-semibold uppercase tracking-[0.06em]"
                      style={{ color: group?.accent }}
                    >
                      {group?.name}
                    </span>
                    <h2 className="display-2 text-grad mt-3 max-w-md text-balance">{service.title}</h2>
                    <p className="type-lead mt-3 text-chalk/70">{service.tagline}</p>
                    <p className="type-body mt-5 max-w-lg text-mute">
                      {service.summary}
                    </p>

                    <ul className="mt-7 space-y-3">
                      {service.points.map((p) => (
                        <li key={p} className="type-body flex items-center gap-3 text-chalk">
                          <span
                            className="grid h-6 w-6 shrink-0 place-items-center rounded-full"
                            style={{ background: `${group?.accent}22`, color: group?.accent }}
                          >
                            <FiCheck size={13} />
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      onClick={() => onOpenBooking?.()}
                      className="type-cta mt-8 inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-6 py-3 text-chalk transition-colors duration-300 hover:bg-white/[0.16]"
                    >
                      <FiCalendar size={15} /> Book this treatment
                    </button>
                  </Reveal>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <AppointmentCTA onOpenBooking={onOpenBooking} />
    </>
  );
}
