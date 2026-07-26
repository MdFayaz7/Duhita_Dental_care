import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiBookOpen, FiDownload, FiChevronLeft, FiChevronRight, FiX, FiFileText } from 'react-icons/fi';
import client, { resolveFileUrl } from '../../api/client';
import SectionHeading from '../ui/SectionHeading';

const AUTOPLAY_DELAY = 6000;

export default function ResearchSection() {
  const [papers, setPapers] = useState([]);
  const [current, setCurrent] = useState(0);
  const [pdfModalUrl, setPdfModalUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .get('/research')
      .then((res) => {
        if (res.data.research && res.data.research.length > 0) {
          setPapers(res.data.research);
        } else {
          setPapers(defaultFallbackPapers);
        }
      })
      .catch(() => {
        setPapers(defaultFallbackPapers);
      })
      .finally(() => setLoading(false));
  }, []);

  const total = papers.length;

  const nextSlide = useCallback(() => {
    if (total > 0) {
      setCurrent((prev) => (prev + 1) % total);
    }
  }, [total]);

  const prevSlide = useCallback(() => {
    if (total > 0) {
      setCurrent((prev) => (prev - 1 + total) % total);
    }
  }, [total]);

  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_DELAY);
    return () => clearInterval(timer);
  }, [total, nextSlide]);

  if (loading) return null;

  return (
    <section id="research" className="bg-brand-light-card py-24 dark:bg-brand-dark-card md:py-32 border-y border-brand-navy/5 dark:border-white/5">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Clinical Research"
          title="Innovations & Scientific Publications"
          description="Read our latest clinical studies, dental technology papers, and patient care research."
          className="mb-12"
        />

        {papers.length > 0 && (
          <div className="relative">
            {/* Carousel Card Container */}
            <div className="overflow-hidden rounded-3xl bg-white p-6 md:p-10 shadow-xl dark:bg-brand-dark-bg border border-brand-navy/10 dark:border-white/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                  {/* Cover Image / PDF First-Page Preview */}
                  <div className="lg:col-span-5 relative group overflow-hidden rounded-2xl aspect-[4/3] bg-brand-light-card dark:bg-white/5 flex items-center justify-center border border-brand-navy/10 dark:border-white/10">
                    {papers[current].coverImageUrl ? (
                      <img
                        src={resolveFileUrl(papers[current].coverImageUrl)}
                        alt={papers[current].title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-6 text-center text-brand-primary">
                        <FiFileText size={64} className="mb-2 opacity-80" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">PDF Research Publication</span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 rounded-full bg-brand-primary/90 px-3.5 py-1 text-xs font-bold text-white backdrop-blur-md">
                      {papers[current].category || 'Research'}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                    <div>
                      <div className="text-xs font-semibold text-brand-primary dark:text-brand-light-accent uppercase tracking-wider mb-2">
                        Published by {papers[current].authors || 'Dr. Nalluru Sasidhar'} • {papers[current].publishDate}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-brand-navy dark:text-white leading-tight">
                        {papers[current].title}
                      </h3>
                      <p className="mt-4 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                        {papers[current].description}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 flex flex-wrap gap-4 items-center">
                      <button
                        type="button"
                        onClick={() => setPdfModalUrl(resolveFileUrl(papers[current].pdfUrl))}
                        className="inline-flex items-center gap-2 rounded-2xl bg-brand-primary px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-primary/25 hover:bg-brand-primary/90 transition-all"
                      >
                        <FiBookOpen size={18} /> Read Online
                      </button>

                      <a
                        href={resolveFileUrl(papers[current].pdfUrl)}
                        download
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-2xl border border-brand-navy/15 dark:border-white/15 px-6 py-3.5 text-sm font-semibold text-brand-navy dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-all"
                      >
                        <FiDownload size={18} /> Download PDF
                      </a>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            {total > 1 && (
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {papers.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      aria-label={`Go to slide ${idx + 1}`}
                      onClick={() => setCurrent(idx)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        idx === current ? 'w-8 bg-brand-primary' : 'w-2.5 bg-gray-300 dark:bg-white/20'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={prevSlide}
                    aria-label="Previous research"
                    className="rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-brand-dark-card p-3 text-gray-700 dark:text-white shadow-md hover:scale-105 transition-all"
                  >
                    <FiChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next research"
                    className="rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-brand-dark-card p-3 text-gray-700 dark:text-white shadow-md hover:scale-105 transition-all"
                  >
                    <FiChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* PDF Viewer Lightbox Modal */}
      <AnimatePresence>
        {pdfModalUrl && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-5xl h-[85vh] rounded-3xl bg-white dark:bg-brand-dark-bg overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5">
                <div className="flex items-center gap-2 text-sm font-semibold text-brand-navy dark:text-white">
                  <FiBookOpen size={18} className="text-brand-primary" /> Online Research Reader
                </div>
                <button
                  type="button"
                  onClick={() => setPdfModalUrl(null)}
                  className="rounded-full p-2 text-gray-500 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>

              <div className="flex-1 w-full h-full bg-gray-100 dark:bg-gray-900">
                <iframe
                  src={`${pdfModalUrl}#toolbar=1`}
                  title="PDF Research Viewer"
                  className="w-full h-full border-none"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

const defaultFallbackPapers = [
  {
    _id: '1',
    title: 'Advances in Painless Root Canal Therapy & Endodontics',
    description:
      'A comprehensive study on modern rotary endodontics and laser disinfection techniques reducing patient discomfort by 90%.',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    coverImageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop',
    authors: 'Dr. Nalluru Sasidhar, M.D.S',
    publishDate: '2025-06-15',
    category: 'Endodontics',
  },
  {
    _id: '2',
    title: 'Immediate Loading Dental Implants: Clinical Outcomes',
    description:
      'Evaluating success rates of same-day implant placement using 3D CBCT guided surgical templates over a 5-year study.',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    coverImageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop',
    authors: 'Dr. Nalluru Sasidhar & Implantology Department',
    publishDate: '2024-11-20',
    category: 'Implantology',
  },
];
