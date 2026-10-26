import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { faq } from '@/content/guia';
import { site } from '@/content/site';

export default function Faq() {
  return (
    <section id="duvidas" className="bg-cream px-6 py-28 md:py-36">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <SectionHeading label="Dúvidas" title={<>Perguntas <em className="text-leaf">frequentes</em></>} />
          <Reveal className="mt-8 text-ink-soft">
            Ficou alguma dúvida?{' '}
            <a href={site.whatsappUrl} target="_blank" rel="noopener" className="text-leaf underline decoration-leaf/30 underline-offset-4 hover:decoration-leaf">
              Fale pelo WhatsApp
            </a>
            .
          </Reveal>
        </div>

        <Reveal className="divide-y divide-ink/10 border-y border-ink/10">
          {faq.map(item => (
            <details key={item.q} className="group py-6">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-xl text-ink md:text-2xl [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="mt-1 shrink-0 font-label text-lg text-leaf transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">{item.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
