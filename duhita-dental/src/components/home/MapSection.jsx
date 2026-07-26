import { motion } from 'framer-motion';
import { FiClock, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { site } from '../../data/content';
import SectionHeading from '../ui/SectionHeading';

export default function MapSection() {
  return (
    <section id="contact" className="bg-brand-surface py-24 dark:bg-brand-dark-surface md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Visit Us"
          title="Find Us at Benz Circle"
          description="Conveniently located on NH 16 Service Road, Vijayawada."
          className="mb-14"
        />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-4"
          >
            {[
              { icon: FiMapPin, label: 'Address', value: site.address },
              { icon: FiPhone, label: 'Phone', value: site.phoneDisplay, href: `tel:${site.phone}` },
              { icon: FiMail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-brand-navy/8 bg-white p-6 dark:border-white/10 dark:bg-brand-dark-card"
              >
                <div className="mb-2 flex items-center gap-2 text-brand-primary">
                  <item.icon size={18} />
                  <span className="text-xs font-bold uppercase tracking-[0.18em]">
                    {item.label}
                  </span>
                </div>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-sm leading-relaxed text-brand-navy transition-colors hover:text-brand-primary dark:text-white/85 dark:hover:text-brand-primary"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-sm leading-relaxed text-brand-navy dark:text-white/85">{item.value}</p>
                )}
              </div>
            ))}

            <div className="rounded-2xl border border-brand-navy/8 bg-white p-6 dark:border-white/10 dark:bg-brand-dark-card">
              <div className="mb-3 flex items-center gap-2 text-brand-primary">
                <FiClock size={18} />
                <span className="text-xs font-bold uppercase tracking-[0.18em]">
                  Hospital Timings
                </span>
              </div>
              <p className="text-sm text-brand-navy dark:text-white/85">
                <span className="font-semibold">Morning:</span> {site.hours.morning}
              </p>
              <p className="mt-1 text-sm text-brand-navy dark:text-white/85">
                <span className="font-semibold">Evening:</span> {site.hours.evening}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="overflow-hidden rounded-[2rem] border border-brand-navy/8 bg-white shadow-[0_20px_60px_-30px_rgba(11,19,65,0.2)] dark:border-white/10 dark:bg-brand-dark-card"
          >
            <iframe
              title="Duhita Multispeciality Dental Centre location"
              src={site.mapEmbed}
              className="h-[420px] w-full md:h-full md:min-h-[480px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
