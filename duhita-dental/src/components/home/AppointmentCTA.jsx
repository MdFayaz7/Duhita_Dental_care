import { FiArrowUpRight, FiPhone } from 'react-icons/fi';
import { appointmentCta, site } from '../../data/content';
import Reveal from '../ui/Reveal';

export default function AppointmentCTA({ onOpenBooking }) {
  return (
    <section className="relative overflow-hidden bg-black py-20 md:py-28">
      <div className="shell">
        <Reveal from="scale">
          <div className="noise relative overflow-hidden rounded-[32px] border border-white/[0.1] bg-gradient-to-br from-[#0b1c33] via-[#070c18] to-black px-7 py-14 text-center md:rounded-[40px] md:px-16 md:py-20">
            <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,rgba(10,132,255,0.4),transparent)]" />
            <div className="relative">
              <h2 className="display-2 text-grad mx-auto max-w-3xl text-balance">{appointmentCta.title}</h2>
              <p className="type-lead mx-auto mt-5 max-w-2xl text-mute">
                {appointmentCta.description}
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => onOpenBooking?.()}
                  className="type-cta group inline-flex items-center gap-1.5 rounded-full bg-white px-6 py-3 text-black transition-colors duration-300 hover:bg-white/90"
                >
                  Reserve a slot
                  <FiArrowUpRight size={16} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
                <a
                  href={`tel:${site.phone}`}
                  className="type-cta inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-6 py-3 text-chalk transition-colors duration-300 hover:bg-white/[0.16]"
                >
                  <FiPhone size={16} /> {site.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
