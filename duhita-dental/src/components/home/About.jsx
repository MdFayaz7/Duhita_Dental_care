import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiVolume2, FiVolumeX } from 'react-icons/fi';
import { about, site, stats } from '../../data/content';
import { images } from '../../data/assets';
import useInView from '../../hooks/useInView';
import { CounterCard } from '../ui/AnimatedCounter';
import Button from '../ui/Button';
import SectionHeading from '../ui/SectionHeading';

export default function About() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [imageRef, imageInView] = useInView({ threshold: 0.2 });
  const [isMuted, setIsMuted] = useState(false); // Audio ON by default when in About section

  const playWithAudio = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    setIsMuted(false);
    const promise = video.play();

    if (promise !== undefined) {
      promise.catch(() => {
        // Fallback to muted if browser blocks unmuted play before first user gesture
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
    <section ref={sectionRef} id="about" className="bg-brand-white py-24 dark:bg-brand-dark-bg md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: 9:16 HD Video Showcase (Duhitha2.mp4) */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: -32 }}
            animate={imageInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex justify-center relative"
          >
            <div className="relative w-full max-w-[360px] sm:max-w-[380px] overflow-hidden rounded-[2.5rem] border border-brand-navy/15 dark:border-white/20 bg-black p-2.5 shadow-2xl">
              {/* 9:16 Aspect Ratio Frame */}
              <div className="relative overflow-hidden rounded-[2rem] aspect-[9/16] w-full bg-black flex items-center justify-center">
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  playsInline
                  poster={images.hospital}
                  className="h-full w-full object-cover filter brightness-105 contrast-105"
                >
                  <source src="/Duhitha2.mp4" type="video/mp4" />
                  <img
                    src={images.hospital}
                    alt="Duhita Dental hospital"
                    className="h-full w-full object-cover"
                  />
                </video>

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Sound Toggle Button */}
                <button
                  type="button"
                  onClick={toggleSound}
                  className="absolute top-4 right-4 z-20 flex items-center gap-2 rounded-full border border-white/30 bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md hover:bg-black/80 transition-all shadow-lg"
                  aria-label="Toggle Audio"
                >
                  {isMuted ? (
                    <>
                      <FiVolumeX size={14} className="text-red-400" /> Sound Off
                    </>
                  ) : (
                    <>
                      <FiVolume2 size={14} className="text-emerald-400 animate-pulse" /> Sound On
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Established Badge */}
            <div className="absolute -bottom-4 -right-2 sm:right-4 rounded-2xl border border-brand-primary/10 bg-white px-5 py-3 shadow-[0_20px_60px_-20px_rgba(11,19,65,0.25)] dark:border-white/10 dark:bg-brand-dark-card z-20">
              <p className="text-2xl font-bold text-brand-primary">{site.established}</p>
              <p className="text-xs font-medium text-brand-gray dark:text-white/60">Year Established</p>
            </div>
          </motion.div>

          {/* Right Column: About Content */}
          <div className="lg:col-span-7">
            <SectionHeading eyebrow={about.eyebrow} title={about.title} />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="mt-6 text-base leading-relaxed text-brand-gray dark:text-white/65 md:text-lg"
            >
              {about.body}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="mt-8"
            >
              <Button href="#services" variant="outline">
                Explore Services
                <FiArrowRight />
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Stats Counter Section */}
        <div className="relative mt-24 overflow-hidden rounded-[2.5rem] bg-brand-navy px-6 py-14 dark:bg-brand-dark-card md:px-12 md:py-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,99,220,0.35),transparent_55%)]" />
          <div className="relative mb-10 max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-accent">
              Our Trustworthy Service Towards
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
              Numbers that reflect decades of care
            </h3>
          </div>
          <div className="relative grid gap-5 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <CounterCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
