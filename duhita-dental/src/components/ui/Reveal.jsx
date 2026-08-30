import { motion } from 'framer-motion';

const VARIANTS = {
  up: { y: 40, opacity: 0 },
  down: { y: -32, opacity: 0 },
  left: { x: 48, opacity: 0 },
  right: { x: -48, opacity: 0 },
  scale: { scale: 0.94, opacity: 0 },
  fade: { opacity: 0 },
};

export default function Reveal({
  children,
  as = 'div',
  from = 'up',
  delay = 0,
  duration = 0.85,
  amount = 0.25,
  once = true,
  className = '',
  ...rest
}) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      initial={VARIANTS[from] || VARIANTS.up}
      whileInView={{ x: 0, y: 0, scale: 1, opacity: 1 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 0.68, 0, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
