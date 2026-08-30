import { useState } from 'react';
import { serviceGroups } from '../../data/services';

export default function ServiceMedia({ service, className = '', priority = false, zoom = true }) {
  const [loaded, setLoaded] = useState(false);
  const accent = serviceGroups.find((g) => g.id === service.group)?.accent || '#64d2ff';
  const contain = service.fit === 'contain';

  return (
    <div className={`relative isolate overflow-hidden bg-black ${className}`}>
      {!contain && (
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(115% 80% at 50% 12%, ${accent}26 0%, rgba(0,0,0,0) 60%), linear-gradient(180deg, #0a0c11 0%, #05060a 100%)`,
          }}
        />
      )}

      <img
        src={service.image}
        alt={service.title}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        draggable="false"
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 h-full w-full transition-[opacity,transform] duration-[1100ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${
          contain ? 'object-contain p-[8%]' : 'object-cover'
        } ${loaded ? 'scale-100 opacity-100' : 'scale-[1.03] opacity-0'} ${zoom ? 'group-hover:scale-[1.045]' : ''}`}
      />

      {!contain && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_100%_at_50%_118%,rgba(0,0,0,0.72),transparent_55%)]" />
      )}
    </div>
  );
}
