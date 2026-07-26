import { motion } from 'framer-motion';
import { appointmentCta, site } from '../../data/content';
import SectionHeading from '../ui/SectionHeading';

export default function AppointmentCTA({ onOpenBooking }) {
  return (
    <section className="relative overflow-hidden bg-brand-navy py-24 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(0,99,220,0.4),transparent_60%)]" />
      <div className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-brand-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            title={appointmentCta.title}
            description={appointmentCta.description}
            align="center"
            light
            className="max-w-3xl"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <button
              type="button"
              onClick={() => onOpenBooking && onOpenBooking()}
              className="inline-flex items-center justify-center rounded-2xl bg-brand-primary px-8 py-4 text-base font-semibold text-white shadow-xl shadow-brand-primary/30 hover:bg-brand-primary/90 transition-all hover:scale-105"
            >
              Reserve My Slot!
            </button>
            <a
              href={site.social.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-md hover:bg-white/20 transition-all"
            >
              WhatsApp Us
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
