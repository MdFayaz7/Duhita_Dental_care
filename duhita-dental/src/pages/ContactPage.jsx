import { useOutletContext } from 'react-router-dom';
import { FiCalendar, FiPhone } from 'react-icons/fi';
import { contactCards, site } from '../data/content';
import PageHero from '../components/layout/PageHero';
import MapSection from '../components/home/MapSection';
import FAQ from '../components/home/FAQ';
import Reveal from '../components/ui/Reveal';

export default function ContactPage() {
  const { onOpenBooking } = useOutletContext();

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Come see us in Vijayawada."
        subtitle="Call, message on WhatsApp or reserve a slot online — whichever is quickest for you."
      >
        <button
          type="button"
          onClick={() => onOpenBooking?.()}
          className="type-cta inline-flex items-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-white transition-colors duration-300 hover:bg-[#3b9bff]"
        >
          <FiCalendar size={16} /> Book an appointment
        </button>
        <a
          href={site.social.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="type-cta inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-6 py-3 text-chalk transition-colors duration-300 hover:bg-white/[0.16]"
        >
          <FiPhone size={16} /> WhatsApp us
        </a>
      </PageHero>

      <section className="bg-black pb-8">
        <div className="shell grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contactCards.map((c, i) => {
            const Tag = c.href ? 'a' : 'div';
            return (
              <Reveal key={c.label} delay={i * 0.07}>
                <Tag
                  href={c.href}
                  className="block h-full rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.055] to-white/[0.01] p-6 transition-all duration-500 hover:-translate-y-0.5 hover:border-white/20"
                >
                  <span className="type-caption font-semibold tracking-[0.06em] text-mute-2">{c.label}</span>
                  <p className="mt-2 text-[19px] font-medium tracking-[-0.01em] text-white">{c.value}</p>
                </Tag>
              </Reveal>
            );
          })}
        </div>
      </section>

      <MapSection />
      <FAQ />
    </>
  );
}
