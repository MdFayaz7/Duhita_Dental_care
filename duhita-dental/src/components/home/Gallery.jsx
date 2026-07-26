import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiX, FiLayers } from 'react-icons/fi';
import client, { resolveFileUrl } from '../../api/client';
import SectionHeading from '../ui/SectionHeading';
import { galleryImages as defaultHospitalImages } from '../../data/content';

const AUTOPLAY_DELAY = 4500;

export default function Gallery() {
  const [activeTab, setActiveTab] = useState('hospital'); // 'hospital' | 'camp'
  const [hospitalImages, setHospitalImages] = useState([]);
  const [campImages, setCampImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    // Fetch Hospital Gallery
    client
      .get('/gallery/hospital')
      .then((res) => {
        if (res.data.images && res.data.images.length > 0) {
          setHospitalImages(res.data.images);
        } else {
          setHospitalImages(defaultHospitalImages.map((img, i) => ({ _id: `h-${i}`, imageUrl: img, title: `Hospital Image ${i + 1}` })));
        }
      })
      .catch(() => {
        setHospitalImages(defaultHospitalImages.map((img, i) => ({ _id: `h-${i}`, imageUrl: img, title: `Hospital Image ${i + 1}` })));
      });

    // Fetch Camp Gallery
    client
      .get('/gallery/camp')
      .then((res) => {
        if (res.data.images && res.data.images.length > 0) {
          setCampImages(res.data.images);
        } else {
          setCampImages(defaultCampFallbackImages);
        }
      })
      .catch(() => {
        setCampImages(defaultCampFallbackImages);
      });
  }, []);

  const activeList = activeTab === 'hospital' ? hospitalImages : campImages;
  const total = activeList.length;

  // Reset index when changing tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrent(0);
  };

  const go = useCallback(
    (next) => {
      if (total === 0) return;
      setDirection(next > current ? 1 : -1);
      setCurrent((next + total) % total);
    },
    [current, total]
  );

  const prev = () => go(current - 1);
  const next = () => go(current + 1);

  useEffect(() => {
    if (total <= 1) return;
    const id = setTimeout(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % total);
    }, AUTOPLAY_DELAY);
    return () => clearTimeout(id);
  }, [current, total]);

  const variants = {
    enter: (d) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <section id="gallery" className="bg-brand-white py-24 dark:bg-brand-dark-bg md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Visual Showcase"
          title="Hospital & Dental Camp Gallery"
          description="Explore our state-of-the-art dental facilities and community outreach programs."
          className="mb-8"
        />

        {/* Tab Switcher */}
        <div className="mb-10 flex justify-center">
          <div className="inline-flex rounded-2xl bg-gray-100 p-1.5 dark:bg-white/10 shadow-inner">
            <button
              type="button"
              onClick={() => handleTabChange('hospital')}
              className={`flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all ${
                activeTab === 'hospital'
                  ? 'bg-brand-primary text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <FiLayers size={16} /> Hospital Gallery
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('camp')}
              className={`flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all ${
                activeTab === 'camp'
                  ? 'bg-brand-primary text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <FiLayers size={16} /> Dental Camp Gallery
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        {total > 0 ? (
          <div>
            <div
              className="relative overflow-hidden rounded-3xl shadow-2xl bg-black/5 dark:bg-white/5 border border-brand-navy/10 dark:border-white/10"
              style={{ aspectRatio: '16/8' }}
            >
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.img
                  key={`${activeTab}-${current}`}
                  src={resolveFileUrl(activeList[current]?.imageUrl)}
                  alt={activeList[current]?.title || 'Gallery photo'}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
                  className="absolute inset-0 h-full w-full cursor-pointer object-cover"
                  onClick={() => setLightbox(current)}
                />
              </AnimatePresence>

              {/* Bottom gradient title */}
              <div className="pointer-events-none absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white flex justify-between items-end">
                <div>
                  <h4 className="text-lg font-bold">{activeList[current]?.title || 'Gallery Preview'}</h4>
                  {activeList[current]?.location && (
                    <p className="text-xs text-gray-300">📍 {activeList[current].location} {activeList[current].date ? `• ${activeList[current].date}` : ''}</p>
                  )}
                </div>
                <div className="rounded-full bg-black/50 px-3.5 py-1 text-xs font-semibold text-white backdrop-blur-md">
                  {current + 1} / {total}
                </div>
              </div>

              {/* Prev / Next buttons */}
              {total > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 p-3 text-white backdrop-blur-md transition-all hover:bg-black/70 hover:scale-110"
                    aria-label="Previous image"
                  >
                    <FiChevronLeft size={22} />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 p-3 text-white backdrop-blur-md transition-all hover:bg-black/70 hover:scale-110"
                    aria-label="Next image"
                  >
                    <FiChevronRight size={22} />
                  </button>
                </>
              )}
            </div>

            {/* Dot indicators */}
            <div className="mt-6 flex justify-center gap-2">
              {activeList.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => go(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? 'w-7 bg-brand-primary'
                      : 'w-2 bg-brand-navy/25 hover:bg-brand-primary/50 dark:bg-white/30'
                  }`}
                />
              ))}
            </div>

            {/* Thumbnail strip */}
            <div className="mt-6 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {activeList.map((item, i) => (
                <button
                  key={item._id || i}
                  type="button"
                  onClick={() => go(i)}
                  className={`shrink-0 overflow-hidden rounded-xl transition-all duration-300 ${
                    i === current
                      ? 'ring-2 ring-brand-primary ring-offset-2 opacity-100 scale-105'
                      : 'opacity-50 hover:opacity-80'
                  }`}
                >
                  <img
                    src={resolveFileUrl(item.imageUrl)}
                    alt={`Thumbnail ${i + 1}`}
                    className="h-16 w-24 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="py-12 text-center text-gray-500">No images available in this gallery tab yet.</div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox !== null && activeList[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-5 backdrop-blur-md"
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              className="absolute right-6 top-6 rounded-full bg-white/10 p-3 text-white hover:bg-white/25 transition-colors"
              onClick={() => setLightbox(null)}
              aria-label="Close lightbox"
            >
              <FiX size={24} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={resolveFileUrl(activeList[lightbox].imageUrl)}
              alt="Gallery preview"
              className="max-h-[85vh] max-w-5xl rounded-2xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

const defaultCampFallbackImages = [
  {
    _id: 'c1',
    title: 'Free Dental Screening Camp',
    location: 'Benz Circle, Vijayawada',
    date: '2025-02-10',
    imageUrl: 'https://www.duhitadental.in/wp-content/uploads/2024/08/4.jpg',
  },
  {
    _id: 'c2',
    title: 'School Dental Awareness Program',
    location: 'Gurunanak Nagar',
    date: '2025-04-18',
    imageUrl: 'https://www.duhitadental.in/wp-content/uploads/2024/08/5.jpg',
  },
  {
    _id: 'c3',
    title: 'Free Oral Health Checkup',
    location: 'KP Nagar, Vijayawada',
    date: '2025-05-22',
    imageUrl: 'https://www.duhitadental.in/wp-content/uploads/2024/08/6.jpg',
  },
];
