import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import FloatingActions from '../components/layout/FloatingActions';
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Services from '../components/home/Services';
import AppointmentCTA from '../components/home/AppointmentCTA';
import ResearchSection from '../components/home/ResearchSection';
import Gallery from '../components/home/Gallery';
import Doctor from '../components/home/Doctor';
import FAQ from '../components/home/FAQ';
import GoogleReviews from '../components/home/GoogleReviews';
import MapSection from '../components/home/MapSection';
import BookingModal from '../components/modal/BookingModal';

export default function HomePage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState('Dr. Nalluru Sasidhar');

  const handleOpenBooking = (doctorName = 'Dr. Nalluru Sasidhar') => {
    setSelectedDoctor(doctorName);
    setBookingOpen(true);
  };

  return (
    <>
      <Navbar onOpenBooking={handleOpenBooking} />
      <main>
        <Hero onOpenBooking={handleOpenBooking} />
        <About />
        <Services />
        <AppointmentCTA onOpenBooking={handleOpenBooking} />
        <ResearchSection />
        <Gallery />
        <Doctor onOpenBooking={handleOpenBooking} />
        <GoogleReviews />
        <FAQ />
        <MapSection />
      </main>
      <Footer />
      <FloatingActions onOpenBooking={handleOpenBooking} />

      {/* Appointment Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        defaultDoctor={selectedDoctor}
      />
    </>
  );
}
