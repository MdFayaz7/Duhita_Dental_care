import { useState } from 'react';

export default function LazyImage({ src, alt = '', className = '', wrapperClassName = '', ...rest }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <span className={`relative block overflow-hidden ${wrapperClassName}`}>
      <span
        className={`absolute inset-0 bg-gradient-to-br from-white/[0.07] to-white/[0.02] transition-opacity duration-700 ${
          loaded ? 'opacity-0' : 'opacity-100 animate-pulse'
        }`}
      />
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`transition-all duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${
          loaded ? 'scale-100 opacity-100 blur-0' : 'scale-105 opacity-0 blur-md'
        } ${className}`}
        {...rest}
      />
    </span>
  );
}
