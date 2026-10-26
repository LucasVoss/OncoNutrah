'use client';
import { useState } from 'react';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { toneBg, toneText } from '@/components/ui/colors';
import { sintomas } from '@/content/guia';

export default function Sintomas() {
  const [activeId, setActiveId] = useState(sintomas[0].id);
  const s = sintomas.find(x => x.id === activeId) ?? sintomas[0];

  return (
    <section id="sintomas" className="bg-cream px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Guia de sintomas"
          title={<>O que fazer quando o tratamento <em className="text-leaf">pesa no prato</em></>}
          intro="Escolha um sintoma para ver orientações práticas e os sinais que pedem contato com a equipe."
        />

        <Reveal className="mt-14 grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-12">
          {/* Lista */}
          <div role="tablist" aria-label="Sintomas" className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
            {sintomas.map(item => {
              const selected = item.id === activeId;
              return (
                <button
                  key={item.id}
                  role="tab"
                  aria-selected={selected}
                  aria-controls="sintoma-painel"
                  onClick={() => setActiveId(item.id)}
                  className={`group flex shrink-0 items-center gap-3 rounded-full border px-4 py-2.5 text-left transition-colors lg:rounded-xl lg:px-5 lg:py-3.5 ${
                    selected ? 'border-ink bg-ink text-cream' : 'border-line bg-paper text-ink hover:border-ink/40'
                  }`}
                >
                  <span className={`h-2 w-2 shrink-0 rounded-full ${toneBg[item.color]}`} />
                  <span className="whitespace-nowrap text-[15px] lg:whitespace-normal">{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* Painel */}
          <article id="sintoma-painel" role="tabpanel" key={s.id} className="animate-[fadeUp_.45s_ease-out] rounded-3xl bg-paper p-7 shadow-[0_1px_0_var(--color-line)] md:p-12">
            <p className={`font-label text-xs uppercase tracking-[0.22em] ${toneText[s.color]}`}>{s.short}</p>
            <h3 className="mt-3 font-display text-3xl text-ink md:text-5xl">{s.name}</h3>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{s.intro}</p>

            <div className="mt-10 grid gap-10 md:grid-cols-[1.4fr_1fr]">
              <div>
                <h4 className="font-label text-[11px] uppercase tracking-[0.2em] text-ink">O que pode ajudar</h4>
                <ul className="mt-5 space-y-4">
                  {s.dicas.map(d => (
                    <li key={d} className="flex gap-3 leading-relaxed text-ink">
                      <span className={`mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full ${toneBg[s.color]}`} />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="self-start rounded-2xl border border-tomato/25 bg-tomato/[0.06] p-6">
                <h4 className="font-label text-[11px] uppercase tracking-[0.2em] text-tomato">Avise sua equipe se</h4>
                <ul className="mt-4 space-y-3">
                  {s.alerta.map(a => (
                    <li key={a} className="leading-relaxed text-ink">{a}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </Reveal>

        <Reveal className="mt-10 flex flex-col items-start justify-between gap-5 border-t border-ink/10 pt-8 sm:flex-row sm:items-center">
          <p className="max-w-xl text-ink-soft">
            No ebook <span className="text-ink">Sintomas na Mesa</span> cada sintoma vem com cardápios de exemplo, listas de compras e o que levar para a consulta.
          </p>
          <a href="#ebooks" className="shrink-0 font-label text-xs uppercase tracking-[0.16em] text-leaf underline decoration-leaf/30 underline-offset-8 hover:decoration-leaf">
            Conhecer o guia completo →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
