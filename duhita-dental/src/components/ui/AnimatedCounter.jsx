import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import useInView from '../../hooks/useInView';

function formatValue(value) {
  return value >= 1000 ? value.toLocaleString('en-IN') : String(value);
}

export default function AnimatedCounter({ value, suffix = '', duration = 2 }) {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const spring = useSpring(0, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(spring, (v) => formatValue(Math.round(v)));
  const [text, setText] = useState('0');

  useEffect(() => {
    if (inView) spring.set(value);
  }, [inView, spring, value]);

  useEffect(() => {
    return display.on('change', (v) => setText(v));
  }, [display]);

  return (
    <span ref={ref} className="tabular-nums">
      {text}
      {suffix}
    </span>
  );
}

export function CounterCard({ stat, index }) {
  const [ref, inView] = useInView({ threshold: 0.4 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
    >
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand-primary/20 blur-2xl transition-transform duration-500 group-hover:scale-150" />
      <p className="text-4xl font-bold tracking-tight text-white md:text-5xl">
        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
      </p>
      <p className="mt-2 text-sm font-medium text-white/65">{stat.label}</p>
    </motion.div>
  );
}
