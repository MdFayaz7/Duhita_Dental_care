import Reveal from './Reveal';

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
}) {
  const alignment =
    align === 'left' ? 'text-left items-start' : 'text-center items-center mx-auto';

  return (
    <div className={`flex flex-col ${alignment} ${className}`}>
      {eyebrow && (
        <Reveal from="fade" duration={0.6}>
          <span className="type-eyebrow block text-brand-orange">{eyebrow}</span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="display-2 text-grad max-w-4xl text-balance">{title}</h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.12}>
          <p className={`type-lead mt-4 max-w-2xl text-mute ${align === 'center' ? 'mx-auto' : ''}`}>
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
