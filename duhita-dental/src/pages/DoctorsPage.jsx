import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FiCalendar, FiAward } from 'react-icons/fi';
import client, { resolveFileUrl } from '../api/client';
import { doctor as fallbackDoctor } from '../data/content';
import { images } from '../data/assets';
import PageHero from '../components/layout/PageHero';
import DoctorSpotlight from '../components/home/DoctorSpotlight';
import AppointmentCTA from '../components/home/AppointmentCTA';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import LazyImage from '../components/ui/LazyImage';

export default function DoctorsPage() {
  const { onOpenBooking } = useOutletContext();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    client
      .get('/doctors')
      .then((res) => setDoctors(res.data?.doctors || []))
      .catch(() => setDoctors([]));
  }, []);

  const list = doctors.length ? doctors : [fallbackDoctor];

  return (
    <>
      <PageHero
        eyebrow="Our Team"
        title="Specialists, not generalists."
        subtitle="Every discipline at Duhita is led by a clinician trained specifically for it."
      />

      <DoctorSpotlight onOpenBooking={onOpenBooking} compact />

      {list.length > 1 && (
        <section className="bg-black py-20 md:py-28">
          <div className="shell">
            <SectionHeading eyebrow="The Panel" title="Meet the full team." />
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((d, i) => (
                <Reveal key={d._id || d.name} delay={Math.min(i, 5) * 0.06}>
                  <article className="group h-full overflow-hidden rounded-[26px] border border-white/[0.09] bg-gradient-to-b from-white/[0.055] to-white/[0.012] transition-all duration-700 hover:-translate-y-1 hover:border-white/20">
                    <LazyImage
                      src={d.image ? resolveFileUrl(d.image) : images.doctor}
                      alt={d.name}
                      wrapperClassName="aspect-[4/5] w-full"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                    />
                    <div className="p-6">
                      <h3 className="text-[21px] font-semibold leading-[1.19048] tracking-[-0.01em] text-white">{d.name}</h3>
                      <p className="type-body mt-1 text-brand-cyan">{d.qualification}</p>
                      <p className="type-body mt-3 flex items-center gap-2 text-mute">
                        <FiAward size={14} className="text-mute-2" />
                        {d.specialization || 'General Dentistry'} · {d.experienceYears || 10}+ yrs
                      </p>
                      <button
                        type="button"
                        onClick={() => onOpenBooking?.(d.name)}
                        className="type-cta mt-5 inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-5 py-2.5 text-chalk transition-colors duration-300 hover:bg-white/[0.16]"
                      >
                        <FiCalendar size={14} /> Book
                      </button>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <AppointmentCTA onOpenBooking={onOpenBooking} />
    </>
  );
}
