import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { faqs } from '../../data/content';
import { images } from '../../data/assets';
import useInView from '../../hooks/useInView';
import LazyImage from '../ui/LazyImage';
import SectionHeading from '../ui/SectionHeading';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.15 });

  return (
    <section id="faq" className="bg-brand-surface py-24 dark:bg-brand-dark-surface md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              title="Frequently Asked Questions"
              description="Everything you need to know before your visit."
            />
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-10 space-y-3"
            >
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={faq.question}
                    className="overflow-hidden rounded-2xl border border-brand-navy/8 bg-white dark:border-white/10 dark:bg-brand-dark-card"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="font-semibold text-brand-navy dark:text-white">{faq.question}</span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        className="shrink-0 text-brand-primary"
                      >
                        <FiChevronDown size={20} />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p className="border-t border-brand-surface px-6 pb-5 pt-3 text-sm leading-relaxed text-brand-gray dark:border-white/10 dark:text-white/60">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="overflow-hidden rounded-[2rem]">
              <LazyImage
                src={images.faq}
                alt="Dental care at Duhita"
                className="aspect-[4/5] w-full object-cover"
                wrapperClassName="w-full"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 rounded-2xl bg-brand-primary px-6 py-4 text-white shadow-xl dark:shadow-brand-primary/20">
              <p className="text-2xl font-bold">4.0 ★</p>
              <p className="text-sm text-white/80">Google Rating</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
