import { Link } from 'react-router-dom';

const BASE =
  'type-cta inline-flex items-center justify-center gap-1.5 rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/70 disabled:opacity-50';

const SIZES = {
  sm: 'px-4 py-2 text-[14px]',
  md: 'px-6 py-3',
  lg: 'px-7 py-3.5',
};

const VARIANTS = {
  primary: 'bg-brand-primary text-white hover:bg-[#3b9bff]',
  glass: 'bg-white/[0.08] text-chalk hover:bg-white/[0.16]',
  ghost: 'text-brand-primary hover:opacity-80',
  light: 'bg-white text-black hover:bg-white/90',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  className = '',
  ...rest
}) {
  const cls = `${BASE} ${SIZES[size]} ${VARIANTS[variant]} ${className}`;
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>;
  return <button type="button" className={cls} {...rest}>{children}</button>;
}
