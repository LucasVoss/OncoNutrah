'use client';
import { useState } from 'react';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { mitos } from '@/content/guia';

function MitoCard({ claim, verdict, answer }: (typeof mitos)[number]) {
  const [open, setOpen] = useState(false);
  const isMito = verdict === 'Mito';

  return (
    <button
      onClick={() => setOpen(!open)}
      aria-expanded={open}
      className="group flex h-full w-full flex-col rounded-3xl border border-cream/10 bg-cream/[0.04] p-7 text-left transition-colors hover:border-cream/25 md:p-8"
    >
      <span className="font-display text-2xl leading-snug text-cream">“{claim}”</span>
      <span className="mt-auto pt-8">
        {open ? (
          <span className="block animate-[fadeUp_.35s_ease-out]">
            <span className={`inline-block rounded-full px-3 py-1 font-label text-[11px] uppercase tracking-[0.2em] ${
              isMito ? 'bg-tomato text-paper' : 'bg-lime text-ink'
            }`}>
              {verdict}
            </span>
            <span className="mt-4 block leading-relaxed text-cream/75">{answer}</span>
          </span>
        ) : (
          <span className="font-label text-[11px] uppercase tracking-[0.2em] text-lime">
            Mito ou verdade? <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </span>
        )}
      </span>
    </button>
  );
}

export default function Mitos() {
  return (
    <section id="mitos" className="bg-ink px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          tone="dark"
          label="Mitos e verdades"
          title={<>O que você vai ouvir <em className="text-lime">e o que a ciência diz</em></>}
          intro="Depois do diagnóstico chegam muitos conselhos, de parentes, de grupos de mensagem e da internet. Toque em cada frase para ver a resposta."
        />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mitos.map((m, i) => (
            <Reveal key={m.claim} delay={(i % 3) * 100} className="h-full">
              <MitoCard {...m} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
