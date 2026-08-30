import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import { faqs } from '../../data/content';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative bg-black py-24 md:py-32">
      <div className="shell max-w-4xl">
        <SectionHeading eyebrow="FAQ" title="Questions, answered." />

        <div className="mt-14 divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {faqs.map((faq, i) => {
            const active = open === i;
            return (
              <Reveal key={faq.question} delay={i * 0.05}>
                <button
                  type="button"
                  onClick={() => setOpen(active ? -1 : i)}
                  className="flex w-full items-start justify-between gap-6 py-6 text-left"
                >
                  <span className={`text-[19px] font-semibold leading-[1.21] tracking-[-0.01em] transition-colors ${active ? 'text-white' : 'text-chalk/80'}`}>
                    {faq.question}
                  </span>
                  <span
                    className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                      active ? 'rotate-45 border-brand-cyan/50 bg-brand-primary/20 text-brand-cyan' : 'border-white/12 text-mute'
                    }`}
                  >
                    <FiPlus size={15} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {active && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="type-body pb-7 pr-12 text-mute">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
