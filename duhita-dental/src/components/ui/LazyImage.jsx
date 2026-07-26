import { useEffect, useRef, useState } from 'react';

export default function LazyImage({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  priority = false,
  ...props
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(priority);

  useEffect(() => {
    if (priority || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '120px' },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [priority]);

  return (
    <div ref={ref} className={`overflow-hidden ${wrapperClassName}`}>
      <img
        src={isVisible ? src : undefined}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        className={`transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}
        {...props}
      />
    </div>
  );
}
