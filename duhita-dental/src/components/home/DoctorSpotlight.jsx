import { useEffect, useState } from 'react';
import { FiCalendar, FiCheck } from 'react-icons/fi';
import client, { resolveFileUrl } from '../../api/client';
import { doctor as fallbackDoctor } from '../../data/content';
import { images } from '../../data/assets';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import LazyImage from '../ui/LazyImage';

export default function DoctorSpotlight({ onOpenBooking, compact = false }) {
  const [list, setList] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    let alive = true;
    client
      .get('/doctors')
      .then((res) => {
        if (!alive) return;
        const docs = res.data?.doctors || [];
        if (docs.length > 0) {
          setList(docs);
          setActive(docs[0]);
        } else {
          setActive(fallbackDoctor);
        }
      })
      .catch(() => alive && setActive(fallbackDoctor));
    return () => {
      alive = false;
    };
  }, []);

  const doc = active || fallbackDoctor;
  const photo = doc.image ? resolveFileUrl(doc.image) : images.doctor;
  const highlights = doc.highlights?.length ? doc.highlights : fallbackDoctor.highlights;

  return (
    <section id="doctors" className="relative overflow-hidden bg-black py-24 md:py-32">
      <div className="pointer-events-none absolute -right-32 top-1/4 h-[460px] w-[460px] rounded-full bg-[radial-gradient(closest-side,rgba(10,132,255,0.16),transparent)]" />

      <div className="shell relative">
        {!compact && (
          <SectionHeading
            align="left"
            eyebrow="Our Team"
            title="Doctors"
            subtitle="Specialist-led care, from first consultation to final review."
            className="max-w-2xl"
          />
        )}

        {list.length > 1 && (
          <Reveal className="mt-10 flex flex-wrap gap-2.5">
            {list.map((d) => (
              <button
                key={d._id || d.name}
                type="button"
                onClick={() => setActive(d)}
                className={`type-body rounded-full border px-4 py-2 text-[15px] transition-all duration-400 ${
                  (active?._id || active?.name) === (d._id || d.name)
                    ? 'border-brand-cyan/40 bg-brand-primary/15 text-white'
                    : 'border-white/10 text-mute hover:border-white/25 hover:text-white'
                }`}
              >
                {d.name}
              </button>
            ))}
          </Reveal>
        )}

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
          <Reveal from="right">
            <div className="relative mx-auto max-w-sm lg:mx-0">
              <div className="pointer-events-none absolute -inset-6 rounded-[44px] bg-[radial-gradient(closest-side,rgba(100,210,255,0.28),transparent)] blur-xl" />
              <div className="relative overflow-hidden rounded-[32px] border border-white/[0.12] bg-white/[0.03] p-2">
                <LazyImage
                  src={photo}
                  alt={doc.name}
                  wrapperClassName="rounded-[24px]"
                  className="aspect-[4/5] w-full rounded-[24px] object-cover"
                />
              </div>
            </div>
          </Reveal>

          <Reveal from="left">
            <h3 className="display-3 text-grad max-w-lg text-balance">{doc.name}</h3>
            <p className="type-lead mt-3 text-brand-cyan">
              {doc.qualification} · {doc.specialization || 'Oral & Maxillofacial Surgery'} ·{' '}
              {doc.experienceYears || 28}+ years
            </p>
            <p className="type-body mt-5 max-w-lg text-mute">
              Every plan is discussed before it is started — what will be done, why it is needed, how long it takes
              and what it costs. No surprises, no upselling.
            </p>

            <ul className="mt-8 space-y-3">
              {highlights.map((h) => (
                <li key={h} className="type-body flex items-center gap-3 text-chalk">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-primary/15 text-brand-cyan ring-1 ring-brand-primary/25">
                    <FiCheck size={13} />
                  </span>
                  {h}
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => onOpenBooking?.(doc.name)}
              className="type-cta group mt-9 inline-flex items-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-white transition-colors duration-300 hover:bg-[#3b9bff]"
            >
              <FiCalendar size={16} /> Consult {doc.name}
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
