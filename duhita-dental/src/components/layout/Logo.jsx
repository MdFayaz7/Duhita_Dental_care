import { images } from '../../data/assets';

export default function Logo({ height = 48, className = '' }) {
  return (
    <span className={`relative inline-flex shrink-0 items-center ${className}`}>
      <span className="pointer-events-none absolute -inset-2 rounded-full bg-[radial-gradient(closest-side,rgba(127,190,56,0.55),transparent)] opacity-0 blur-md transition-opacity duration-700 group-hover:opacity-100" />
      <img
        src={images.logo}
        alt="Duhita Dental Care"
        height={height}
        style={{ height }}
        draggable="false"
        className="relative w-auto origin-center object-contain transition-transform duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.07]"
      />
    </span>
  );
}
