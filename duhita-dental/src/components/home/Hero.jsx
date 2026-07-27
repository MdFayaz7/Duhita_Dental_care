import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiMapPin, FiPhone, FiVolume2, FiVolumeX } from 'react-icons/fi';
import { site } from '../../data/content';
import { images } from '../../data/assets';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero({ onOpenBooking }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true); // Start muted for instant autoplay

  const playWithAudio = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    setIsMuted(false);
    const promise = video.play();

    if (promise !== undefined) {
      promise.catch(() => {
        // Fallback to muted if browser blocks unmuted play before first user interaction
        video.muted = true;
        setIsMuted(true);
        video.play().catch(() => {});
      });
    }
  };

  const pauseAndMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.muted = true;
    setIsMuted(true);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playWithAudio();
        } else {
          pauseAndMute();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Enable sound on first user gesture anywhere on page
    const handleUserGesture = () => {
      if (videoRef.current && !videoRef.current.paused) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
    };

    window.addEventListener('click', handleUserGesture, { once: true });
    window.addEventListener('scroll', handleUserGesture, { once: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('click', handleUserGesture);
      window.removeEventListener('scroll', handleUserGesture);
    };
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (video) {
      const nextMuted = !isMuted;
      video.muted = nextMuted;
      setIsMuted(nextMuted);
      if (!nextMuted) {
        video.play().catch(() => {});
      }
    }
  };

  return (
    <section ref={sectionRef} className="relative min-h-[90dvh] overflow-hidden bg-brand-navy dark:bg-brand-dark-bg pt-28 pb-16 lg:py-32">
      {/* Background Soft Glows */}
      <div className="pointer-events-none absolute -right-24 top-1/4 h-[30rem] w-[30rem] rounded-full bg-brand-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-brand-accent/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="lg:col-span-7 xl:col-span-7">
            <motion.div
              custom={0.1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md shadow-md"
            >
              <span className="h-2 w-2 rounded-full bg-brand-accent animate-pulse" />
              Est. {site.established} · Benz Circle, Vijayawada
            </motion.div>

            <motion.h1
              custom={0.2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-2xl font-bold leading-[1.15] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[2.75rem] drop-shadow-md"
            >
              {site.tagline}
            </motion.h1>

            <motion.div
              custom={0.4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-6 flex flex-wrap gap-4 items-center"
            >
              <button
                type="button"
                onClick={() => onOpenBooking && onOpenBooking()}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-primary px-8 py-4 text-base font-semibold text-white shadow-2xl shadow-brand-primary/40 hover:bg-brand-primary/90 transition-all hover:scale-105"
              >
                Book an Appointment
                <FiArrowRight size={18} />
              </button>
              <a
                href={site.social.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-md hover:bg-white/20 transition-all shadow-lg"
              >
                WhatsApp Us
              </a>
            </motion.div>

            <motion.div
              custom={0.55}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-10 grid max-w-xl gap-4 sm:grid-cols-2"
            >
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md shadow-md">
                <div className="mb-1.5 flex items-center gap-2 text-sm font-medium text-white/80">
                  <FiMapPin className="text-brand-accent" />
                  Location
                </div>
                <p className="text-sm font-semibold text-white">Benz Circle, Vijayawada</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md shadow-md">
                <div className="mb-1.5 flex items-center gap-2 text-sm font-medium text-white/80">
                  <FiPhone className="text-brand-accent" />
                  Call Us
                </div>
                <a
                  href={`tel:${site.phone}`}
                  className="text-sm font-semibold text-white transition-colors hover:text-brand-accent"
                >
                  {site.phoneDisplay}
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column - 9:16 Portrait Video Showcase */}
          <div className="lg:col-span-5 xl:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-[360px] sm:max-w-[400px] overflow-hidden rounded-[2.5rem] border border-white/25 bg-black p-2.5 shadow-2xl backdrop-blur-xl"
            >
              {/* 9:16 Aspect Ratio Frame */}
              <div className="relative overflow-hidden rounded-[2rem] aspect-[9/16] w-full bg-black flex items-center justify-center">
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  poster={images.hospital}
                  className="h-full w-full object-cover filter brightness-105 contrast-105"
                >
                  <source src="/Duhitha1.mp4" type="video/mp4" />
                  <img
                    src={images.hospital}
                    alt="Duhita Multispeciality Dental Centre"
                    className="h-full w-full object-cover"
                  />
                </video>

                {/* Subtle Bottom Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Floating Sound Toggle Button */}
                <button
                  type="button"
                  onClick={toggleSound}
                  className="absolute top-4 right-4 z-20 flex items-center gap-2 rounded-full border border-white/30 bg-black/60 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-md hover:bg-black/80 transition-all shadow-lg"
                  aria-label="Toggle Audio"
                >
                  {isMuted ? (
                    <>
                      <FiVolumeX size={16} className="text-red-400" /> Sound Off
                    </>
                  ) : (
                    <>
                      <FiVolume2 size={16} className="text-emerald-400 animate-pulse" /> Sound On
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
