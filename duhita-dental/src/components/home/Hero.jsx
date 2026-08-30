import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import { heroCopy, site } from '../../data/content';
import { images, media } from '../../data/assets';
import TiltCard from '../ui/TiltCard';

const rise = (delay) => ({
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 0.68, 0, 1] },
});

export default function Hero({ onOpenBooking }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const fade = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-black pb-20 pt-32 md:pb-28 md:pt-36">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[-10%] top-[-12%] h-[820px] w-[820px] rounded-full bg-[radial-gradient(closest-side,rgba(10,132,255,0.22),transparent)]" />
        <div className="absolute left-[-18%] bottom-[-24%] h-[620px] w-[620px] rounded-full bg-[radial-gradient(closest-side,rgba(100,210,255,0.10),transparent)]" />
      </div>

      <motion.div style={{ y, opacity: fade }} className="mx-auto w-full max-w-[1440px] px-5 md:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,580px)_minmax(0,1fr)] lg:gap-12">
          <div>
            <motion.span {...rise(0)} className="type-eyebrow block text-brand-orange">
              {heroCopy.eyebrow}
            </motion.span>

            <motion.h1 {...rise(0.08)} className="display-1 text-grad mt-3 lg:text-[3rem] xl:text-[3.5rem]">
              {heroCopy.titleTop}
              <span className="block text-grad-blue">{heroCopy.titleBottom}</span>
            </motion.h1>

            <motion.div {...rise(0.16)} className="mt-10 flex flex-col items-center text-center lg:-ml-8 lg:-mr-14">
              <img
                src={images.ehs}
                alt="Employee Health Scheme, Government of Andhra Pradesh"
                width={200}
                height={188}
                decoding="async"
                className="h-[160px] w-auto sm:h-[190px] lg:h-[220px]"
              />
              <div className="mt-5 rounded-xl bg-[#d1121c] px-5 py-3 shadow-[0_10px_30px_-12px_rgba(209,18,28,0.9)]">
                <p className="text-[15px] font-bold uppercase leading-tight tracking-[0.12em] text-white">
                  Employee Health Scheme
                </p>
                <p className="mt-1.5 text-[15px] font-bold uppercase leading-tight tracking-[0.12em] text-white">
                  Govt of AP
                </p>
              </div>
            </motion.div>

            <motion.div {...rise(0.26)} className="mt-10 flex flex-wrap items-center gap-6">
              <button
                type="button"
                onClick={() => onOpenBooking?.()}
                className="type-cta inline-flex items-center rounded-full bg-brand-primary px-6 py-3 text-white transition-colors duration-300 hover:bg-[#3b9bff]"
              >
                Book an appointment
              </button>
              <a
                href={`tel:${site.phone}`}
                className="type-cta inline-flex items-center gap-1.5 text-brand-cyan transition-opacity duration-300 hover:opacity-75"
              >
                {site.phoneDisplay}
                <FiArrowUpRight size={16} />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 34 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.14, ease: [0.22, 0.68, 0, 1] }}
            className="relative"
            style={{ perspective: 1400 }}
          >
            <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[56px] bg-[radial-gradient(closest-side,rgba(10,132,255,0.3),transparent)] blur-2xl" />

            <TiltCard strength={6} className="rounded-[26px]">
              <div className="relative overflow-hidden rounded-[26px] border border-white/[0.1] bg-white/[0.04] p-1.5 shadow-[0_50px_130px_-40px_rgba(0,0,0,1)] md:rounded-[30px] md:p-2">
                <div className="relative aspect-video overflow-hidden rounded-[20px] bg-black md:rounded-[24px]">
                  <video
                    className="absolute inset-0 h-full w-full object-cover"
                    src={media.heroVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    poster={images.hero}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.14),transparent_26%,transparent_76%,rgba(0,0,0,0.3))]" />
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
