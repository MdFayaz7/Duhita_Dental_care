import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { allServices, services } from '../../data/content';
import useInView from '../../hooks/useInView';
import Button from '../ui/Button';
import LazyImage from '../ui/LazyImage';
import SectionHeading from '../ui/SectionHeading';

export default function Services() {
  const [active, setActive] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.15 });
  const current = services[active];

  return (
    <section id="services" className="bg-brand-surface py-24 dark:bg-brand-dark-surface md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Our Services"
          title="All Your Dental Needs at One Place"
          description="Comprehensive multispeciality care — from cosmetic enhancements to advanced surgical treatments."
          className="mb-16"
        />

        <div
          ref={ref}
          className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-[2rem] bg-brand-navy"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5 }}
                className="relative aspect-[5/4] md:aspect-[16/11]"
              >
                <LazyImage
                  src={current.image}
                  alt={current.title}
                  className="h-full w-full object-cover"
                  wrapperClassName="h-full w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">
                    Featured Service
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
                    {current.title}
                  </h3>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/75 md:text-base">
                    {current.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <div className="flex flex-col gap-3">
            {services.map((service, index) => (
              <motion.button
                key={service.title}
                type="button"
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                onClick={() => setActive(index)}
                className={`group rounded-2xl border px-6 py-5 text-left transition-all duration-300 ${
                  active === index
                    ? 'border-brand-primary bg-white shadow-[0_16px_48px_-24px_rgba(0,99,220,0.45)] dark:bg-brand-dark-card dark:border-brand-primary/50'
                    : 'border-transparent bg-white/60 hover:border-brand-primary/20 hover:bg-white dark:bg-brand-dark-card/50 dark:hover:bg-brand-dark-card dark:hover:border-brand-primary/30'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-brand-navy dark:text-white">{service.title}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-brand-gray dark:text-white/60">{service.description}</p>
                  </div>
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                      active === index
                        ? 'bg-brand-primary text-white'
                        : 'bg-brand-surface text-brand-navy group-hover:bg-brand-primary/10'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </motion.button>
            ))}

            <div className="mt-4 rounded-2xl border border-dashed border-brand-primary/25 bg-white/70 p-6 dark:border-brand-primary/30 dark:bg-brand-dark-card">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-primary">
                Specialities
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {allServices.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-brand-surface px-3 py-1.5 text-xs font-medium text-brand-navy-soft dark:bg-brand-dark-surface dark:text-white/75"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <Button href="/services" variant="outline" className="mt-2 self-start">
              View All Services
              <FiArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
