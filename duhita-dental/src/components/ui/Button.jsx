import { motion } from 'framer-motion';

const variants = {
  primary:
    'bg-brand-primary text-white hover:bg-brand-primary-dark shadow-[0_12px_40px_-12px_rgba(0,99,220,0.55)]',
  secondary:
    'bg-white/10 text-white border border-white/25 backdrop-blur-md hover:bg-white/20',
  outline:
    'bg-transparent text-brand-navy border border-brand-navy/15 hover:border-brand-primary hover:text-brand-primary dark:text-white dark:border-white/20 dark:hover:border-brand-primary dark:hover:text-brand-primary',
  ghost: 'bg-brand-surface text-brand-navy hover:bg-brand-surface-alt dark:bg-brand-dark-card dark:text-white dark:hover:bg-brand-dark-surface',
};

const sizes = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-3.5 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-colors duration-300 ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
