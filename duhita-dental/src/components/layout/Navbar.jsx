import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { HiOutlineMenuAlt3, HiOutlineX } from 'react-icons/hi';
import { FiPhone, FiLock } from 'react-icons/fi';
import { site } from '../../data/content';
import { images } from '../../data/assets';
import useScrollPosition from '../../hooks/useScrollPosition';
import LazyImage from '../ui/LazyImage';
import ThemeToggle from '../ui/ThemeToggle';
import { Link } from 'react-router-dom';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Research', href: '/#research' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Contact', href: '/#contact' },
];

function LogoAnimated({ src, alt }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
      transition={{
        opacity: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        x: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        y: { duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 },
      }}
      whileHover={{ scale: 1.1, y: -8 }}
      whileTap={{ scale: 0.95 }}
    >
      <LazyImage
        src={src}
        alt={alt}
        priority
        className="h-20 w-auto object-contain mix-blend-screen md:h-24"
        wrapperClassName="h-20 md:h-24"
      />
    </motion.div>
  );
}

function BrandText() {
  const top = 'DUHITA';
  const bottom = 'MULTISPECIALITY DENTAL CENTER';

  return (
    <motion.div
      className="ml-2 flex flex-col justify-center leading-tight select-none"
      initial="hidden"
      animate="visible"
    >
      <div className="flex overflow-hidden">
        {top.split('').map((char, i) => (
          <motion.span
            key={i}
            className="text-xl font-extrabold tracking-widest text-white md:text-2xl"
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { delay: 0.3 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>

      <motion.div
        className="my-0.5 h-px bg-gradient-to-r from-white/60 via-white/30 to-transparent"
        variants={{
          hidden: { scaleX: 0, originX: 0 },
          visible: { scaleX: 1, transition: { delay: 0.7, duration: 0.5, ease: 'easeOut' } },
        }}
      />

      <div className="flex overflow-hidden">
        {bottom.split('').map((char, i) => (
          <motion.span
            key={i}
            className="text-[8px] font-semibold tracking-[0.18em] text-white/75 md:text-[9px]"
            variants={{
              hidden: { opacity: 0, y: 8 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { delay: 0.75 + i * 0.025, duration: 0.35, ease: 'easeOut' },
              },
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Navbar({ onOpenBooking }) {
  const scrolled = useScrollPosition(24);
  const [open, setOpen] = useState(false);

  const headerClass = scrolled
    ? 'border-b border-white/10 bg-brand-navy/80 shadow-[0_8px_32px_rgba(11,19,65,0.18)] backdrop-blur-xl dark:bg-brand-dark-bg/90 dark:border-white/10'
    : 'bg-transparent';

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${headerClass}`}
      >
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 md:px-8 lg:h-[84px] overflow-visible">
          <a href="/" className="relative z-10 flex shrink-0 items-center gap-1">
            <LogoAnimated src={images.logo} alt={`${site.name} logo`} />
            <BrandText />
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />
            <a
              href={`tel:${site.phone}`}
              className="flex items-center gap-2 text-sm font-medium text-white/85 transition-colors hover:text-white"
            >
              <FiPhone className="text-brand-accent" />
              {site.phoneDisplay}
            </a>

            <button
              type="button"
              onClick={() => onOpenBooking && onOpenBooking()}
              className="inline-flex items-center justify-center rounded-2xl bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-primary/25 hover:bg-brand-primary/90 transition-all hover:scale-105"
            >
              Book Appointment
            </button>

            <Link
              to="/admin/login"
              title="Admin Portal"
              className="rounded-full p-2.5 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <FiLock size={18} />
            </Link>
          </div>

          <div className="relative z-10 flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="rounded-full border border-white/15 p-2.5 text-white"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? <HiOutlineX size={22} /> : <HiOutlineMenuAlt3 size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-brand-navy/95 backdrop-blur-2xl dark:bg-brand-dark-bg/98 lg:hidden"
          >
            <motion.nav
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.35 }}
              className="flex h-full flex-col justify-center gap-2 px-8"
              aria-label="Mobile navigation"
            >
              {navLinks.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="border-b border-white/10 py-4 text-2xl font-semibold text-white"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}
              <div className="mt-8 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onOpenBooking && onOpenBooking();
                  }}
                  className="w-full rounded-2xl bg-brand-primary py-3.5 text-base font-semibold text-white shadow-lg"
                >
                  Book Appointment
                </button>
                <Link
                  to="/admin/login"
                  onClick={() => setOpen(false)}
                  className="w-full text-center rounded-2xl border border-white/20 py-3 text-sm font-semibold text-white"
                >
                  Admin Portal Login
                </Link>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
