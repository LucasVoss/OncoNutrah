import Image from 'next/image';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { toneBg, Tone } from '@/components/ui/colors';
import { pilares } from '@/content/guia';
import ingredientes from '../../../public/images/bowl-ingredientes.webp';

export default function Pilares() {
  return (
    <section id="pilares" className="overflow-hidden bg-paper px-6 py-28 md:py-36">
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHeading
            label="No prato"
            title={<>Quatro pilares para <em className="text-leaf">qualquer fase</em> do tratamento</>}
            intro="Antes de pensar em alimentos específicos, garanta o básico. É isso que sustenta o corpo nas semanas de quimioterapia, radioterapia ou recuperação de cirurgia."
          />
          <dl className="mt-12 space-y-8">
            {pilares.map((p, i) => (
              <Reveal key={p.title} delay={i * 100} className="grid grid-cols-[auto_1fr] gap-x-5">
                <span className={`mt-2.5 h-3 w-3 rounded-full ${toneBg[p.color as Tone]}`} />
                <div>
                  <dt className="font-display text-2xl text-ink">{p.title}</dt>
                  <dd className="mt-2 leading-relaxed text-ink-soft">{p.text}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>

        <Reveal delay={150} className="relative aspect-square w-full sm:aspect-[4/3] lg:aspect-square">
          <Image
            src={ingredientes}
            alt="Ingredientes de um bowl saudável flutuando sobre a tigela: folhas, tomate, cogumelos, grão-de-bico e quinoa"
            fill
            // object-cover de uma foto 16:9 numa caixa quadrada: a foto fica ~1,8x mais
            // larga que a caixa, então pedimos uma versão proporcionalmente maior
            sizes="(min-width: 1024px) 80vw, 180vw"
            quality={92}
            className="object-cover object-[94%_50%]"
          />
          <p className="absolute bottom-2 left-0 font-label text-[10px] uppercase tracking-[0.22em] text-ink-soft">
            Variedade de cores = variedade de nutrientes
          </p>
        </Reveal>
      </div>
    </section>
  );
}
