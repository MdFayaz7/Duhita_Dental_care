import { motion } from 'framer-motion';

export default function PageHero({ eyebrow, title, subtitle, children }) {
  return (
    <section className="noise relative isolate overflow-hidden bg-black pb-16 pt-36 md:pb-24 md:pt-44">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[460px] w-[860px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,rgba(10,132,255,0.26),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.24]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(70% 60% at 50% 20%, #000 10%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(70% 60% at 50% 20%, #000 10%, transparent 100%)',
          }}
        />
      </div>

      <div className="shell text-center">
        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="type-eyebrow block text-brand-orange"
          >
            {eyebrow}
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.06, ease: [0.22, 0.68, 0, 1] }}
          className="display-1 text-grad mx-auto mt-3 max-w-4xl text-balance"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.14, ease: [0.22, 0.68, 0, 1] }}
            className="type-intro mx-auto mt-5 max-w-2xl text-mute"
          >
            {subtitle}
          </motion.p>
        )}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.22 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
