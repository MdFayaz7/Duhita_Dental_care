import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiBookOpen, FiDownload, FiFileText, FiX } from 'react-icons/fi';
import client, { resolveFileUrl } from '../../api/client';
import SectionHeading from '../ui/SectionHeading';
import Slider from '../ui/Slider';

export default function ResearchSection() {
  const [papers, setPapers] = useState([]);
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .get('/research')
      .then((res) => setPapers(res.data?.research || []))
      .catch(() => setPapers([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setPdf(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (loading || !papers.length) return null;

  return (
    <section id="research" className="relative overflow-hidden bg-[#04050a] py-24 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(100,210,255,0.14),transparent)]" />

      <div className="shell relative">
        <SectionHeading
          align="left"
          eyebrow="Clinical"
          title="Research"
          subtitle="Studies, case series and clinical papers authored by the Duhita team."
          className="md:max-w-2xl"
        />
      </div>

      <div className="relative mx-auto mt-14 w-full max-w-[1220px] px-5 md:px-8">
        <Slider itemClassName="-mx-5 px-5 md:-mx-8 md:px-8">
          {papers.map((paper, i) => (
            <article
              key={paper._id || i}
              className="flex w-[84vw] shrink-0 snap-start flex-col overflow-hidden rounded-[26px] bg-white/[0.04] sm:w-[62vw] md:w-[44vw] lg:w-[36%]"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-brand-primary/25 via-[#0a1020] to-black">
                {paper.coverImageUrl ? (
                  <img
                    src={resolveFileUrl(paper.coverImageUrl)}
                    alt={paper.title}
                    loading={i < 2 ? 'eager' : 'lazy'}
                    decoding="async"
                    draggable="false"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center">
                    <FiFileText className="text-brand-cyan/70" size={56} />
                  </div>
                )}
                <span className="type-caption absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1.5 font-semibold tracking-[0.05em] text-brand-cyan backdrop-blur-xl">
                  {paper.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-[21px] font-semibold leading-[1.19048] tracking-[-0.01em] text-white">
                  {paper.title}
                </h3>
                <p className="type-body mt-3 line-clamp-4 flex-1 text-mute">
                  {paper.description}
                </p>
                <p className="type-caption mt-4 text-mute-2">
                  {paper.authors} · {paper.publishDate}
                </p>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPdf(resolveFileUrl(paper.pdfUrl))}
                    className="type-cta inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-black transition-colors duration-300 hover:bg-white/90"
                  >
                    <FiBookOpen size={15} /> Read
                  </button>
                  <a
                    href={resolveFileUrl(paper.pdfUrl)}
                    target="_blank"
                    rel="noreferrer"
                    draggable="false"
                    className="type-cta inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-5 py-2.5 text-chalk transition-colors duration-300 hover:bg-white/[0.16]"
                  >
                    <FiDownload size={15} /> PDF
                  </a>
                </div>
              </div>
            </article>
          ))}
        </Slider>
      </div>

      <AnimatePresence>
        {pdf && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex flex-col bg-black/95 p-4 backdrop-blur-xl md:p-8"
          >
            <div className="mb-3 flex justify-end">
              <button
                type="button"
                onClick={() => setPdf(null)}
                aria-label="Close"
                className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <FiX size={20} />
              </button>
            </div>
            <iframe title="Research paper" src={pdf} className="min-h-0 w-full flex-1 rounded-2xl bg-white" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
