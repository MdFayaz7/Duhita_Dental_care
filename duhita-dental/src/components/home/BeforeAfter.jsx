import { useCallback, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { beforeAfter } from '../../data/content';
import useInView from '../../hooks/useInView';
import LazyImage from '../ui/LazyImage';
import SectionHeading from '../ui/SectionHeading';

export default function BeforeAfter() {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef(null);
  const [ref, inView] = useInView({ threshold: 0.2 });
  const pair = beforeAfter[0];

  const updatePosition = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(98, Math.max(2, next)));
  }, []);

  return (
    <section className="bg-brand-surface py-24 dark:bg-brand-dark-surface md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Transformations"
          title="Before & After"
          description="See the difference expert dental care makes — drag to compare results."
          className="mb-14"
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl"
        >
          <div
            ref={containerRef}
            className="relative aspect-[4/3] cursor-ew-resize select-none overflow-hidden rounded-[2rem] shadow-[0_24px_80px_-32px_rgba(11,19,65,0.35)]"
            onPointerDown={(e) => {
              setDragging(true);
              updatePosition(e.clientX);
            }}
            onPointerMove={(e) => dragging && updatePosition(e.clientX)}
            onPointerUp={() => setDragging(false)}
            onPointerLeave={() => setDragging(false)}
          >
            <LazyImage
              src={pair.after}
              alt="After treatment"
              className="absolute inset-0 h-full w-full object-cover"
              wrapperClassName="absolute inset-0 h-full w-full"
            />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
              <LazyImage
                src={pair.before}
                alt="Before treatment"
                className="absolute inset-0 h-full w-full object-cover"
                wrapperClassName="absolute inset-0 h-full w-full"
              />
            </div>

            <div
              className="absolute inset-y-0 z-10 w-1 -translate-x-1/2 bg-white shadow-[0_0_20px_rgba(0,0,0,0.3)]"
              style={{ left: `${position}%` }}
            >
              <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-brand-primary text-xs font-bold text-white shadow-lg">
                ↔
              </div>
            </div>

            <span className="absolute left-5 top-5 rounded-full bg-brand-navy/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              Before
            </span>
            <span className="absolute right-5 top-5 rounded-full bg-brand-primary/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              After
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
