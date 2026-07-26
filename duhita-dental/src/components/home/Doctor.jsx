import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiCalendar } from 'react-icons/fi';
import { doctor as fallbackDoctor, site, whyChooseUs } from '../../data/content';
import { images } from '../../data/assets';
import useInView from '../../hooks/useInView';
import LazyImage from '../ui/LazyImage';
import SectionHeading from '../ui/SectionHeading';
import client, { resolveFileUrl } from '../../api/client';

export default function Doctor({ onOpenBooking }) {
  const [ref, inView] = useInView({ threshold: 0.15 });
  const [doctorsList, setDoctorsList] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    client
      .get('/doctors')
      .then((res) => {
        if (res.data.doctors && res.data.doctors.length > 0) {
          setDoctorsList(res.data.doctors);
          setSelectedDoctor(res.data.doctors[0]);
        } else {
          setSelectedDoctor(fallbackDoctor);
        }
      })
      .catch(() => {
        setSelectedDoctor(fallbackDoctor);
      });
  }, []);

  const activeDoc = selectedDoctor || fallbackDoctor;

  return (
    <section id="doctor" className="bg-brand-white py-24 dark:bg-brand-dark-bg md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow={whyChooseUs.eyebrow}
          title={whyChooseUs.title}
          className="mb-16"
        />

        {/* Doctor Selector if multiple doctors exist */}
        {doctorsList.length > 1 && (
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {doctorsList.map((doc) => (
              <button
                key={doc._id}
                type="button"
                onClick={() => setSelectedDoctor(doc)}
                className={`rounded-2xl px-5 py-2.5 text-sm font-semibold transition-all ${
                  activeDoc._id === doc._id
                    ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/25 scale-105'
                    : 'bg-brand-surface dark:bg-brand-dark-card text-brand-navy dark:text-white hover:bg-gray-200'
                }`}
              >
                {doc.name} ({doc.qualification})
              </button>
            ))}
          </div>
        )}

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid items-center gap-12 overflow-hidden rounded-[2.5rem] bg-brand-surface dark:bg-brand-dark-card lg:grid-cols-[0.9fr_1.1fr]"
        >
          <div className="relative p-8 lg:p-12">
            <div className="relative mx-auto max-w-sm overflow-hidden rounded-[2rem] bg-white p-3 shadow-[0_24px_60px_-30px_rgba(11,19,65,0.3)] dark:bg-brand-dark-surface">
              <LazyImage
                src={activeDoc.image ? resolveFileUrl(activeDoc.image) : images.doctor}
                alt={activeDoc.name}
                className="aspect-[3/4] w-full rounded-[1.5rem] object-cover object-top"
                wrapperClassName="w-full"
              />
            </div>
            <div className="absolute bottom-4 left-4 rounded-2xl border border-brand-primary/10 bg-white px-5 py-3 shadow-lg dark:border-white/10 dark:bg-brand-dark-surface lg:bottom-10 lg:left-10">
              <p className="text-sm font-bold text-brand-primary">Lead Specialist</p>
              <p className="text-xs text-brand-gray dark:text-white/60">{activeDoc.qualification}</p>
            </div>
          </div>

          <div className="px-8 pb-10 lg:px-12 lg:py-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-primary">
              Meet the Doctor
            </p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight text-brand-navy dark:text-white md:text-4xl">
              {activeDoc.name} {activeDoc.qualification}
            </h3>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-gray dark:text-white/65">
              {site.description}
            </p>

            <ul className="mt-8 space-y-4">
              {(activeDoc.highlights || fallbackDoctor.highlights).map((item, index) => (
                <motion.li
                  key={item + index}
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.15 + index * 0.08 }}
                  className="flex items-center gap-3 text-brand-navy-soft dark:text-white/85"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary shrink-0">
                    <FiCheck size={16} />
                  </span>
                  <span className="font-medium">{item}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => onOpenBooking && onOpenBooking(activeDoc.name)}
                className="inline-flex items-center gap-2 rounded-2xl bg-brand-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-primary/25 hover:bg-brand-primary/90 transition-all hover:scale-105"
              >
                <FiCalendar size={18} /> Book Appointment
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
