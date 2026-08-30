import { useOutletContext } from 'react-router-dom';
import PageHero from '../components/layout/PageHero';
import Gallery from '../components/home/Gallery';
import AppointmentCTA from '../components/home/AppointmentCTA';

export default function GalleryPage() {
  const { onOpenBooking } = useOutletContext();

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="A look inside the clinic."
        subtitle="Operatories, equipment and the community dental camps we run across the district."
      />
      <Gallery full />
      <AppointmentCTA onOpenBooking={onOpenBooking} />
    </>
  );
}
