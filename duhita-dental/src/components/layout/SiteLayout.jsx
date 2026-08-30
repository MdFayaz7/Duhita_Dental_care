import { useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingActions from './FloatingActions';
import BookingModal from '../modal/BookingModal';

export default function SiteLayout() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [doctor, setDoctor] = useState('Dr. Nalluru Sasidhar');
  const { pathname, hash } = useLocation();

  const openBooking = useCallback((name = 'Dr. Nalluru Sasidhar') => {
    setDoctor(typeof name === 'string' ? name : 'Dr. Nalluru Sasidhar');
    setBookingOpen(true);
  }, []);

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return undefined;
    }
    let tries = 0;
    let timer = 0;
    const seek = () => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      if (tries < 24) {
        tries += 1;
        timer = window.setTimeout(seek, 120);
      }
    };
    seek();
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return (
    <>
      <Navbar onOpenBooking={openBooking} />
      <main className="min-h-screen bg-black">
        <Outlet context={{ onOpenBooking: openBooking }} />
      </main>
      <Footer />
      <FloatingActions onOpenBooking={openBooking} />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} defaultDoctor={doctor} />
    </>
  );
}
