import Reveal from './Reveal';

export default function SectionHeading({
  label,
  title,
  intro,
  tone = 'light',
  align = 'left',
}: {
  label: string;
  title: React.ReactNode;
  intro?: string;
  tone?: 'light' | 'dark';
  align?: 'left' | 'center';
}) {
  const dark = tone === 'dark';
  return (
    <Reveal className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <p className={`font-label text-xs uppercase tracking-[0.22em] ${dark ? 'text-lime' : 'text-leaf'}`}>
        {label}
      </p>
      <h2 className={`mt-4 font-display text-4xl leading-[1.05] md:text-6xl ${dark ? 'text-cream' : 'text-ink'}`}>
        {title}
      </h2>
      {intro && (
        <p className={`mt-6 text-lg leading-relaxed ${dark ? 'text-cream/75' : 'text-ink-soft'}`}>{intro}</p>
      )}
    </Reveal>
  );
}
