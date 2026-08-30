import { useOutletContext } from 'react-router-dom';
import Hero from '../components/home/Hero';
import Marquee from '../components/home/Marquee';
import AboutPreview from '../components/home/AboutPreview';
import ServicesShowcase from '../components/home/ServicesShowcase';
import AppointmentCTA from '../components/home/AppointmentCTA';
import ResearchSection from '../components/home/ResearchSection';
import DoctorSpotlight from '../components/home/DoctorSpotlight';
import Gallery from '../components/home/Gallery';
import GoogleReviews from '../components/home/GoogleReviews';
import FAQ from '../components/home/FAQ';
import MapSection from '../components/home/MapSection';

export default function HomePage() {
  const { onOpenBooking } = useOutletContext();

  return (
    <>
      <Hero onOpenBooking={onOpenBooking} />
      <Marquee />
      <AboutPreview />
      <ServicesShowcase />
      <AppointmentCTA onOpenBooking={onOpenBooking} />
      <DoctorSpotlight onOpenBooking={onOpenBooking} />
      <ResearchSection />
      <Gallery />
      <GoogleReviews />
      <FAQ />
      <MapSection />
    </>
  );
}
