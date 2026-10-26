import Reveal from '@/components/ui/Reveal';
import { site } from '@/content/site';

export default function Autora() {
  const { about } = site;

  return (
    <section id="autora" className="bg-paper px-6 py-28 md:py-36">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="font-label text-xs uppercase tracking-[0.22em] text-leaf">Quem está com você</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] text-ink md:text-6xl">{about.title}</h2>
        </Reveal>

        {/* Equipe: sem nomes, mais informações chegam com o ebook */}
        <Reveal delay={100} className="mt-10 grid gap-6 rounded-[1.75rem] border border-leaf/20 bg-leaf/[0.05] p-7 sm:grid-cols-[auto_1fr] md:p-9">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-leaf text-xl text-paper" aria-hidden="true">✓</span>
          <div>
            <h3 className="font-display text-2xl text-ink md:text-3xl">{about.team.title}</h3>
            <p className="mt-3 text-lg leading-relaxed text-ink">{about.team.text}</p>
            <p className="mt-3 leading-relaxed text-ink-soft">{about.team.afterPurchase}</p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <p className="mt-14 font-display text-2xl italic leading-snug text-leaf md:text-3xl">{about.tagline}</p>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-soft">
            {about.bio.map(p => <p key={p}>{p}</p>)}
          </div>

          {/* Relato pessoal */}
          <div className="mt-12 rounded-[1.75rem] bg-cream p-7 md:p-10">
            <h3 className="font-display text-3xl text-ink md:text-4xl">{about.story.title}</h3>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-soft">
              {about.story.paragraphs.map(p => <p key={p}>{p}</p>)}
            </div>
            <p className="mt-6 font-display text-xl italic text-leaf">— {about.story.signature}</p>
          </div>

          <p className="mt-10 border-l-2 border-leaf pl-5 font-display text-xl leading-snug text-ink md:text-2xl">
            {about.closing}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <a href="#ebooks" className="inline-block rounded-full bg-ink px-6 py-3.5 font-label text-xs uppercase tracking-[0.16em] text-cream transition-colors hover:bg-leaf">
              Ver os ebooks
            </a>
            <a href={site.instagramUrl} target="_blank" rel="noopener" className="font-label text-xs uppercase tracking-[0.16em] text-leaf underline decoration-leaf/30 underline-offset-8 hover:decoration-leaf">
              Acompanhe no Instagram →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
