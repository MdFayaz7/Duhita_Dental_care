import { motion } from 'framer-motion';
import useInView from '../../hooks/useInView';

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  light = false,
  className = '',
}) {
  const [ref, inView] = useInView({ threshold: 0.3 });

  const alignClass =
    align === 'center'
      ? 'text-center mx-auto'
      : align === 'right'
        ? 'text-right ml-auto'
        : 'text-left';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`max-w-2xl ${alignClass} ${className}`}
    >
      {eyebrow && (
        <p
          className={`mb-3 text-xs font-bold uppercase tracking-[0.22em] ${
            light ? 'text-brand-accent' : 'text-brand-primary dark:text-brand-accent'
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-3xl font-semibold tracking-tight md:text-4xl lg:text-[2.75rem] lg:leading-[1.1] ${
          light ? 'text-white' : 'text-brand-navy dark:text-white'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed md:text-lg ${
            light ? 'text-white/70' : 'text-brand-gray dark:text-white/60'
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
