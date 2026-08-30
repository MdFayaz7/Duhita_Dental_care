import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FiMenu, FiX, FiPhone, FiArrowUpRight } from 'react-icons/fi';
import { navigation, site } from '../../data/content';
import useScrollPosition from '../../hooks/useScrollPosition';
import Logo from './Logo';

export default function Navbar({ onOpenBooking }) {
  const scrolled = useScrollPosition(16);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={`transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            scrolled || open
              ? 'border-b border-white/[0.08] bg-black/70 backdrop-blur-2xl backdrop-saturate-150'
              : 'border-b border-transparent bg-gradient-to-b from-black/60 to-transparent'
          }`}
        >
          <nav className="shell flex h-16 items-center justify-between gap-6 md:h-[68px]">
            <Link to="/" className="group flex items-center gap-2.5">
              <Logo height={52} />
              <span className="text-[16px] font-semibold tracking-[-0.01em] text-chalk transition-opacity group-hover:opacity-80">
                Duhita<span className="font-normal text-mute"> Dental Care</span>
              </span>
            </Link>

            <ul className="hidden items-center gap-1 lg:flex">
              {navigation.map((item) => (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `type-nav relative rounded-full px-3.5 py-2 transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-mute hover:text-white'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}
                        {isActive && (
                          <motion.span
                            layoutId="nav-pill"
                            className="absolute inset-0 -z-10 rounded-full bg-white/[0.08] ring-1 ring-white/10"
                            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${site.phone}`}
                className="type-nav hidden items-center gap-1.5 text-mute transition-colors duration-300 hover:text-white sm:inline-flex"
              >
                <FiPhone size={13} />
                {site.phoneDisplay}
              </a>
              <button
                type="button"
                onClick={() => onOpenBooking?.()}
                className="type-nav inline-flex items-center rounded-full bg-brand-primary px-3.5 py-1.5 font-normal text-white transition-colors duration-300 hover:bg-[#3b9bff]"
              >
                Book
              </button>
              <button
                type="button"
                aria-label="Menu"
                onClick={() => setOpen((v) => !v)}
                className="-mr-1 grid h-9 w-9 place-items-center rounded-full text-chalk transition-colors hover:bg-white/10 lg:hidden"
              >
                {open ? <FiX size={19} /> : <FiMenu size={19} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="shell flex h-full flex-col justify-center pb-16 pt-20">
              <ul className="space-y-1">
                {navigation.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + i * 0.055, duration: 0.6, ease: [0.22, 0.68, 0, 1] }}
                  >
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        `flex items-center justify-between border-b border-white/[0.07] py-5 text-[28px] font-semibold tracking-[-0.02em] transition-colors ${
                          isActive ? 'text-white' : 'text-mute'
                        }`
                      }
                    >
                      {item.label}
                      <FiArrowUpRight className="opacity-40" size={22} />
                    </NavLink>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.6 }}
                className="mt-10 flex flex-col gap-3"
              >
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onOpenBooking?.();
                  }}
                  className="type-cta w-full rounded-full bg-brand-primary py-3.5 text-white"
                >
                  Book an Appointment
                </button>
                <a
                  href={`tel:${site.phone}`}
                  className="type-cta inline-flex w-full items-center justify-center gap-2 rounded-full bg-white/[0.08] py-3.5 text-chalk"
                >
                  <FiPhone size={16} /> {site.phoneDisplay}
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
