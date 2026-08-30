import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import { about, pillars, site } from '../../data/content';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

export default function AboutPreview() {
  return (
    <section id="about" className="relative overflow-hidden bg-black py-24 md:py-32">
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[480px] w-[480px] rounded-full bg-[radial-gradient(closest-side,rgba(100,210,255,0.12),transparent)]" />

      <div className="shell relative">
        <SectionHeading
          align="left"
          eyebrow={about.eyebrow}
          title="Twenty-eight years of getting the details right."
          subtitle={site.description}
          className="max-w-3xl"
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.055] to-white/[0.01] p-7 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:border-white/20">
                <span className="type-caption font-semibold tracking-[0.06em] text-brand-cyan">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 text-[21px] font-semibold leading-[1.19048] tracking-[-0.01em] text-white">{p.title}</h3>
                <p className="type-body mt-2.5 text-mute">{p.body}</p>
                <span className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-[radial-gradient(closest-side,rgba(10,132,255,0.35),transparent)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <Link
            to="/about"
            className="type-cta group inline-flex items-center gap-1.5 text-brand-primary transition-opacity hover:opacity-80"
          >
            Read our story
            <FiArrowUpRight size={16} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
