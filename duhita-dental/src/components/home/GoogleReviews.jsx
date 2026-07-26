import { useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGoogle, FaStar } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { googleReviews } from '../../data/content';
import SectionHeading from '../ui/SectionHeading';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5 text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar key={i} size={14} className={i < rating ? 'opacity-100' : 'opacity-25'} />
      ))}
    </div>
  );
}

function ReviewCard({ review }) {
  const initials = review.authorName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="flex h-full flex-col rounded-2xl border border-brand-navy/8 bg-white p-6 shadow-[0_8px_32px_-16px_rgba(11,19,65,0.12)] dark:border-white/10 dark:bg-brand-dark-card">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {review.authorPhoto ? (
            <img
              src={review.authorPhoto}
              alt={review.authorName}
              className="h-11 w-11 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-surface text-sm font-bold text-brand-primary dark:bg-brand-dark-surface">
              {initials}
            </div>
          )}
          <div>
            <p className="font-semibold text-brand-navy dark:text-white">{review.authorName}</p>
            <p className="text-xs text-brand-gray dark:text-white/50">{review.relativeTime}</p>
          </div>
        </div>
        <FaGoogle className="shrink-0 text-lg text-[#4285F4]" />
      </div>

      <StarRating rating={review.rating} />

      <p className="mt-4 flex-1 text-sm leading-relaxed text-brand-gray line-clamp-5 dark:text-white/65">
        {review.text}
      </p>
    </article>
  );
}

/**
 * Google Reviews section — structured for Google Business Profile API / widget swap.
 * Replace `googleReviews.reviews` with live API data when integrated.
 */
export default function GoogleReviews() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section id="reviews" className="bg-brand-white py-24 dark:bg-brand-dark-bg md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Google Reviews"
            title="What Our Clients Say"
            description="Trusted by patients across Vijayawada."
          />

          <motion.a
            href={googleReviews.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center gap-4 rounded-2xl border border-brand-navy/8 bg-brand-surface px-6 py-4 dark:border-white/10 dark:bg-brand-dark-card"
          >
            <FaGoogle className="text-2xl text-[#4285F4]" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-brand-navy dark:text-white">
                  {googleReviews.rating.toFixed(1)}
                </span>
                <StarRating rating={Math.round(googleReviews.rating)} />
              </div>
              <p className="text-sm text-brand-gray dark:text-white/60">
                {googleReviews.totalReviews} Google reviews
              </p>
            </div>
          </motion.a>
        </div>

        <div className="relative">
          <button
            ref={prevRef}
            type="button"
            aria-label="Previous review"
            className="absolute -left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-brand-navy/10 bg-white text-brand-navy shadow-lg transition-colors hover:bg-brand-surface dark:border-white/10 dark:bg-brand-dark-card dark:text-white dark:hover:bg-brand-dark-surface md:flex"
          >
            <FiChevronLeft size={20} />
          </button>
          <button
            ref={nextRef}
            type="button"
            aria-label="Next review"
            className="absolute -right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-brand-navy/10 bg-white text-brand-navy shadow-lg transition-colors hover:bg-brand-surface dark:border-white/10 dark:bg-brand-dark-card dark:text-white dark:hover:bg-brand-dark-surface md:flex"
          >
            <FiChevronRight size={20} />
          </button>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1.5 },
              900: { slidesPerView: 2.5 },
              1200: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            className="!pb-12"
          >
            {googleReviews.reviews.map((review) => (
              <SwiperSlide key={review.id} className="!h-auto">
                <ReviewCard review={review} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
