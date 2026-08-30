import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import ServiceMedia from './ServiceMedia';
import { serviceGroups } from '../../data/services';

export default function ServiceCard({ service, className = '', priority = false }) {
  const group = serviceGroups.find((g) => g.id === service.group);

  return (
    <Link
      to={`/services#${service.id}`}
      draggable="false"
      className={`group relative flex h-full flex-col overflow-hidden rounded-[26px] bg-black transition-[transform,box-shadow] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:shadow-[0_40px_90px_-40px_rgba(10,132,255,0.65)] ${className}`}
    >
      <ServiceMedia service={service} priority={priority} className="aspect-[4/3] w-full" />

      <div className="flex flex-1 flex-col p-6">
        <span className="type-caption font-semibold uppercase tracking-[0.08em]" style={{ color: group?.accent }}>
          {group?.name}
        </span>
        <h3 className="mt-2.5 text-[21px] font-semibold leading-[1.19048] tracking-[-0.01em] text-white">{service.title}</h3>
        <p className="type-body mt-2 flex-1 text-mute">{service.summary}</p>
        <span className="type-cta mt-5 inline-flex items-center gap-1 text-brand-primary transition-opacity group-hover:opacity-80">
          Explore
          <FiArrowUpRight
            size={15}
            className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
