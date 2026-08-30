import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import { services } from '../../data/services';
import ServiceCard from '../services/ServiceCard';
import SectionHeading from '../ui/SectionHeading';
import Slider from '../ui/Slider';
import Reveal from '../ui/Reveal';

export default function ServicesShowcase() {
  return (
    <section id="services" className="relative overflow-hidden bg-black py-24 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(10,132,255,0.14),transparent)]" />

      <div className="shell relative">
        <SectionHeading
          align="left"
          eyebrow="Specialities"
          title="Our Services"
          subtitle="Every speciality under one roof, each with its own protocol and its own specialist."
          className="md:max-w-2xl"
        />
      </div>

      <div className="relative mt-14">
        <div className="mx-auto w-full max-w-[1220px] px-5 md:px-8">
          <Slider itemClassName="-mx-5 px-5 md:-mx-8 md:px-8">
            {services.map((service, i) => (
              <div
                key={service.id}
                className="w-[78vw] shrink-0 snap-start sm:w-[58vw] md:w-[40vw] lg:w-[30%]"
              >
                <ServiceCard service={service} priority={i < 3} />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="shell mt-12 flex justify-center">
        <Reveal>
          <Link
            to="/services"
            className="type-cta group inline-flex items-center gap-1.5 rounded-full bg-white/[0.08] px-6 py-3 text-chalk transition-colors duration-300 hover:bg-white/[0.16]"
          >
            View all specialities
            <FiArrowUpRight size={16} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
