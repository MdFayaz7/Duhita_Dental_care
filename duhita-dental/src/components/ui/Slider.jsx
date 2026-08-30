import { useCallback, useEffect, useRef, useState } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

export default function Slider({ children, className = '', itemClassName = '', controls = 'below' }) {
  const trackRef = useRef(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: 0 });
  const [progress, setProgress] = useState({ ratio: 0, size: 1 });
  const [edges, setEdges] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress({ ratio: max > 0 ? el.scrollLeft / max : 0, size: el.clientWidth / el.scrollWidth });
    setEdges({ start: el.scrollLeft <= 2, end: max <= 2 || el.scrollLeft >= max - 2 });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return undefined;
    measure();
    el.addEventListener('scroll', measure, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', measure);
      ro.disconnect();
    };
  }, [measure]);

  const step = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild;
    const amount = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  const onPointerDown = (e) => {
    if (e.pointerType === 'touch') return;
    const el = trackRef.current;
    drag.current = { active: true, startX: e.clientX, startLeft: el.scrollLeft, moved: 0 };
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!drag.current.active) return;
    const el = trackRef.current;
    const dx = e.clientX - drag.current.startX;
    drag.current.moved = Math.max(drag.current.moved, Math.abs(dx));
    el.scrollLeft = drag.current.startLeft - dx;
  };

  const endDrag = (e) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    trackRef.current?.releasePointerCapture?.(e.pointerId);
  };

  const onClickCapture = (e) => {
    if (drag.current.moved > 8) {
      e.preventDefault();
      e.stopPropagation();
    }
    drag.current.moved = 0;
  };

  const arrows = (
    <div className="flex shrink-0 items-center gap-2.5">
      <button
        type="button"
        aria-label="Previous"
        disabled={edges.start}
        onClick={() => step(-1)}
        className="grid h-11 w-11 place-items-center rounded-full bg-white/[0.08] text-chalk backdrop-blur-xl transition-all duration-400 hover:bg-white/[0.16] disabled:pointer-events-none disabled:opacity-30"
      >
        <FiArrowLeft size={17} />
      </button>
      <button
        type="button"
        aria-label="Next"
        disabled={edges.end}
        onClick={() => step(1)}
        className="grid h-11 w-11 place-items-center rounded-full bg-white/[0.08] text-chalk backdrop-blur-xl transition-all duration-400 hover:bg-white/[0.16] disabled:pointer-events-none disabled:opacity-30"
      >
        <FiArrowRight size={17} />
      </button>
    </div>
  );

  return (
    <div className={className}>
      {controls === 'above' && <div className="mb-6 flex justify-end">{arrows}</div>}

      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        className={`hide-scroll flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-2 active:cursor-grabbing ${itemClassName}`}
      >
        {children}
      </div>

      <div className="mt-8 flex items-center gap-6">
        <div className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/[0.12]">
          <span
            className="absolute inset-y-0 rounded-full bg-white/85 transition-[left] duration-150"
            style={{
              width: `${Math.max(progress.size, 0.08) * 100}%`,
              left: `${progress.ratio * (100 - Math.max(progress.size, 0.08) * 100)}%`,
            }}
          />
        </div>
        {controls === 'below' && arrows}
      </div>
    </div>
  );
}
