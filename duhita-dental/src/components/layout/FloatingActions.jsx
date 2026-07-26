import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { FiPhone, FiCalendar } from 'react-icons/fi';
import { site } from '../../data/content';

export default function FloatingActions({ onOpenBooking }) {
  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col gap-3 md:bottom-8 md:right-8">
      <motion.button
        type="button"
        onClick={() => onOpenBooking && onOpenBooking()}
        aria-label="Book Appointment"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-accent text-brand-navy font-bold shadow-lg"
      >
        <FiCalendar size={22} />
      </motion.button>

      <motion.a
        href={`tel:${site.phone}`}
        aria-label="Call Duhita Dental"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-primary text-white shadow-[0_12px_40px_-8px_rgba(0,99,220,0.6)]"
      >
        <FiPhone size={22} />
      </motion.a>

      <motion.a
        href={site.social.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Duhita Dental"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.15, duration: 0.5 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_40px_-8px_rgba(37,211,102,0.55)]"
      >
        <FaWhatsapp size={26} />
      </motion.a>
    </div>
  );
}
