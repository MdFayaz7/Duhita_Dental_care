import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiCalendar, FiPhone, FiPlus, FiArrowUp } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { site } from '../../data/content';
import useScrollPosition from '../../hooks/useScrollPosition';

export default function FloatingActions({ onOpenBooking }) {
  const [open, setOpen] = useState(false);
  const scrolled = useScrollPosition(520);

  const actions = [
    { icon: FaWhatsapp, label: 'WhatsApp', href: site.social.whatsapp, tone: 'bg-[#25D366] text-black' },
    { icon: FiPhone, label: 'Call', href: `tel:${site.phone}`, tone: 'bg-white text-black' },
    { icon: FiCalendar, label: 'Book', onClick: () => onOpenBooking?.(), tone: 'bg-brand-primary text-white' },
  ];

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {scrolled && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="glass grid h-11 w-11 place-items-center rounded-full text-chalk"
          >
            <FiArrowUp size={17} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open &&
          actions.map((a, i) => {
            const Tag = a.href ? 'a' : 'button';
            return (
              <motion.div
                key={a.label}
                initial={{ opacity: 0, y: 14, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 14, scale: 0.8 }}
                transition={{ delay: i * 0.05, duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              >
                <Tag
                  href={a.href}
                  target={a.href?.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  onClick={a.onClick}
                  type={a.href ? undefined : 'button'}
                  className={`flex h-12 w-12 items-center justify-center rounded-full shadow-2xl transition-transform duration-300 hover:scale-105 ${a.tone}`}
                  aria-label={a.label}
                >
                  <a.icon size={19} />
                </Tag>
              </motion.div>
            );
          })}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Quick actions"
        className="grid h-14 w-14 place-items-center rounded-full bg-brand-primary text-white shadow-[0_14px_44px_-12px_rgba(10,132,255,1)] transition-transform duration-500 hover:scale-105"
      >
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.4 }}>
          <FiPlus size={24} />
        </motion.span>
      </button>
    </div>
  );
}
