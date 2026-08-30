import { FiStar, FiExternalLink } from 'react-icons/fi';
import { googleReviews } from '../../data/content';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

function Stars({ rating }) {
  return (
    <span className="flex items-center gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <FiStar
          key={i}
          size={13}
          className={i < Math.round(rating) ? 'fill-[#ffd60a] text-[#ffd60a]' : 'text-white/20'}
        />
      ))}
    </span>
  );
}

export default function GoogleReviews() {
  const list = [...googleReviews.reviews, ...googleReviews.reviews];

  return (
    <section className="relative overflow-hidden bg-black py-24 md:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Patient Voices"
          title="Rated by the people who sat in the chair."
          subtitle={`${googleReviews.rating.toFixed(1)} average across Google reviews for ${googleReviews.placeName}.`}
        />
      </div>

      <div className="edge-fade mt-14 overflow-hidden">
        <div className="anim-marquee flex w-max gap-5" style={{ animationDuration: '58s' }}>
          {list.map((r, i) => (
            <article
              key={`${r.id}-${i}`}
              className="flex w-[320px] shrink-0 flex-col rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.055] to-white/[0.012] p-6 sm:w-[380px]"
            >
              <div className="flex items-center justify-between">
                <Stars rating={r.rating} />
                <span className="type-caption text-mute-2">{r.relativeTime}</span>
              </div>
              <p className="type-body mt-4 flex-1 text-chalk/90">“{r.text}”</p>
              <div className="mt-5 flex items-center gap-3 border-t border-white/[0.07] pt-4">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand-cyan to-brand-primary text-[13px] font-bold text-black">
                  {r.authorName.charAt(0)}
                </span>
                <span className="text-[14px] font-semibold tracking-[-0.01em] text-white">{r.authorName}</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="shell mt-12 flex justify-center">
        <Reveal>
          <a
            href={googleReviews.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="type-cta inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-6 py-3 text-chalk transition-colors duration-300 hover:bg-white/[0.16]"
          >
            Read on Google <FiExternalLink size={15} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
