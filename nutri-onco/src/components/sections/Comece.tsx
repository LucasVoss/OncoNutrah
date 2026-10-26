import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { esperanca, primeirosPassos } from '@/content/guia';

export default function Comece() {
  return (
    <section id="comece" className="bg-paper px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Comece aqui"
          title={<>Recebeu o diagnóstico. <em className="text-leaf">E agora</em>, o que eu como?</>}
          intro="É uma das primeiras perguntas de quem começa o tratamento, e quase ninguém responde com calma. A alimentação não cura o câncer, mas ajuda você a manter força, peso e disposição para atravessar o tratamento. Comece por estes três passos."
        />

        <ol className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
          {primeirosPassos.map((p, i) => (
            <Reveal as="li" key={p.n} delay={i * 120} className="bg-paper p-8 md:p-10">
              <span className="font-label text-sm text-leaf">{p.n}</span>
              <h3 className="mt-6 font-display text-2xl text-ink md:text-3xl">{p.title}</h3>
              <p className="mt-4 leading-relaxed text-ink-soft">{p.text}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-6 grid gap-6 rounded-3xl bg-ink p-8 md:grid-cols-[1fr_1.2fr] md:items-center md:gap-12 md:p-12">
          <div>
            <p className="font-label text-[11px] uppercase tracking-[0.2em] text-lime">{esperanca.label}</p>
            <h3 className="mt-4 font-display text-3xl leading-tight text-cream md:text-4xl">{esperanca.title}</h3>
          </div>
          <div>
            <p className="text-lg leading-relaxed text-cream/80">{esperanca.text}</p>
            <a href="#autora" className="mt-6 inline-block font-label text-xs uppercase tracking-[0.16em] text-lime underline decoration-lime/30 underline-offset-8 hover:decoration-lime">
              {esperanca.cta} →
            </a>
          </div>
        </Reveal>

        <Reveal className="mt-10 flex flex-col gap-3 rounded-2xl bg-cream px-6 py-5 text-sm leading-relaxed text-ink-soft sm:flex-row sm:items-center sm:gap-5">
          <span className="font-label text-[11px] uppercase tracking-[0.2em] text-ink">Importante</span>
          <span>
            O conteúdo deste site é educativo e não substitui consulta com médico ou nutricionista.
            Em caso de febre, sangramento ou piora súbita, procure o seu serviço de saúde ou ligue 192.
          </span>
        </Reveal>
      </div>
    </section>
  );
}
