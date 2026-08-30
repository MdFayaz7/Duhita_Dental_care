import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiX, FiMaximize2 } from 'react-icons/fi';
import client, { resolveFileUrl } from '../../api/client';
import { galleryImages as fallbackHospital } from '../../data/content';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import Slider from '../ui/Slider';
import LazyImage from '../ui/LazyImage';

const TABS = [
  { id: 'hospital', label: 'The Clinic' },
  { id: 'camp', label: 'Dental Camps' },
];

const toItems = (arr, prefix) =>
  arr.map((img, i) => ({ _id: `${prefix}-${i}`, imageUrl: img, title: `Duhita ${prefix} ${i + 1}` }));

export default function Gallery({ full = false }) {
  const [tab, setTab] = useState('hospital');
  const [hospital, setHospital] = useState([]);
  const [camp, setCamp] = useState([]);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    client
      .get('/gallery/hospital')
      .then((res) => {
        const imgs = res.data?.images || [];
        setHospital(imgs.length ? imgs : toItems(fallbackHospital, 'hospital'));
      })
      .catch(() => setHospital(toItems(fallbackHospital, 'hospital')));

    client
      .get('/gallery/camp')
      .then((res) => {
        const imgs = res.data?.images || [];
        setCamp(imgs.length ? imgs : toItems(fallbackHospital.slice(0, 6), 'camp'));
      })
      .catch(() => setCamp(toItems(fallbackHospital.slice(0, 6), 'camp')));
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setLightbox(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const list = tab === 'hospital' ? hospital : camp;

  return (
    <section id="gallery" className="relative overflow-hidden bg-black py-24 md:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Gallery"
          title="Inside Duhita."
          subtitle="The clinic, the equipment and the outreach camps we run across Andhra Pradesh."
        />

        <Reveal className="mt-10 flex justify-center">
          <div className="glass inline-flex rounded-full p-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`relative rounded-full px-5 py-2 text-[15px] font-medium tracking-[-0.01em] transition-colors duration-400 ${
                  tab === t.id ? 'text-black' : 'text-mute hover:text-white'
                }`}
              >
                {tab === t.id && (
                  <motion.span
                    layoutId="gallery-tab"
                    className="absolute inset-0 rounded-full bg-white"
                    transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                  />
                )}
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {list.length > 0 && (
        <div className="mx-auto mt-12 w-full max-w-[1220px] px-5 md:px-8">
          <Slider key={tab} itemClassName="-mx-5 px-5 md:-mx-8 md:px-8">
            {list.map((item, i) => (
              <button
                key={item._id || i}
                type="button"
                onClick={() => setLightbox(item)}
                draggable="false"
                className="group relative w-[84vw] shrink-0 snap-center overflow-hidden rounded-[26px] bg-white/[0.03] sm:w-[64vw] md:w-[52vw] lg:w-[44%]"
              >
                <LazyImage
                  src={resolveFileUrl(item.imageUrl)}
                  alt={item.title || 'Duhita Dental'}
                  wrapperClassName="aspect-[16/10] w-full"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.05]"
                  draggable="false"
                />
                <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(0,0,0,0.78))]" />
                <span className="pointer-events-none absolute inset-x-5 bottom-5 flex items-center justify-between gap-3 text-left">
                  <span className="type-body font-medium text-white/90">{item.title}</span>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/12 text-white opacity-0 backdrop-blur-xl transition-opacity duration-500 group-hover:opacity-100">
                    <FiMaximize2 size={14} />
                  </span>
                </span>
              </button>
            ))}
          </Slider>
        </div>
      )}

      {full && list.length > 0 && (
        <div className="shell mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((item, i) => (
            <Reveal key={`grid-${item._id || i}`} delay={Math.min(i, 6) * 0.05}>
              <button
                type="button"
                onClick={() => setLightbox(item)}
                className="group relative block w-full overflow-hidden rounded-3xl"
              >
                <LazyImage
                  src={resolveFileUrl(item.imageUrl)}
                  alt={item.title || ''}
                  wrapperClassName="aspect-[4/3] w-full"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                />
                <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,rgba(0,0,0,0.7))] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </button>
            </Reveal>
          ))}
        </div>
      )}

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/92 p-5 backdrop-blur-xl"
          >
            <button
              type="button"
              aria-label="Close"
              className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white"
            >
              <FiX size={20} />
            </button>
            <motion.img
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              src={resolveFileUrl(lightbox.imageUrl)}
              alt={lightbox.title || ''}
              className="max-h-[86vh] max-w-[92vw] rounded-2xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
