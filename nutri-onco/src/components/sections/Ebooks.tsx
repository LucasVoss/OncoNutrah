import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { toneBg } from '@/components/ui/colors';
import { ebooks, Ebook, site } from '@/content/site';

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

// Capa desenhada em CSS: troque por <Image> quando tiver as capas reais
function Cover({ book, size = 'md' }: { book: Ebook; size?: 'md' | 'lg' }) {
  return (
    <div className={`relative aspect-[3/4] overflow-hidden rounded-r-xl rounded-l-sm bg-cream shadow-[0_30px_60px_-25px_rgba(23,50,43,0.45)] ${
      size === 'lg' ? 'w-52 md:w-64' : 'w-40'
    }`}>
      <div className={`absolute inset-y-0 left-0 w-3 ${toneBg[book.color]} opacity-90`} />
      <div className={`absolute -right-10 -top-10 h-40 w-40 rounded-full ${toneBg[book.color]} opacity-15`} />
      <div className="absolute inset-0 flex flex-col justify-between p-5 pl-7">
        <span className="font-label text-[9px] uppercase tracking-[0.22em] text-ink-soft">{site.brand}</span>
        <span className={`font-display leading-[1.05] text-ink ${size === 'lg' ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>
          {book.title}
        </span>
        <span className="font-label text-[9px] uppercase tracking-[0.22em] text-ink-soft">{book.pages}</span>
      </div>
    </div>
  );
}

function BuyButton({ book, primary }: { book: Ebook; primary?: boolean }) {
  return (
    <a
      href={book.checkoutUrl}
      target={book.checkoutUrl.startsWith('http') ? '_blank' : undefined}
      rel="noopener"
      className={`inline-flex items-center justify-center rounded-full px-6 py-3.5 font-label text-xs uppercase tracking-[0.16em] transition-colors ${
        primary ? 'bg-lime text-ink hover:bg-paper' : 'bg-ink text-cream hover:bg-leaf'
      }`}
    >
      Quero este guia
    </a>
  );
}

export default function Ebooks() {
  const featured = ebooks.find(b => b.featured)!;
  const singles = ebooks.filter(b => !b.featured);

  return (
    <section id="ebooks" className="bg-cream px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          align="center"
          label="Ebooks"
          title={<>Guias completos para <em className="text-leaf">ter por perto</em></>}
          intro="Material aprofundado, organizado para consultar no dia a dia, imprimir e compartilhar com quem cuida de você."
        />

        {/* Destaque */}
        <Reveal className="mt-16 grid items-center gap-10 overflow-hidden rounded-[2rem] bg-ink p-8 md:grid-cols-[auto_1fr] md:gap-14 md:p-14">
          <div className="flex justify-center md:justify-start">
            <div className="rotate-[-4deg]"><Cover book={featured} size="lg" /></div>
          </div>
          <div>
            <span className="inline-block rounded-full bg-lime px-3 py-1 font-label text-[11px] uppercase tracking-[0.2em] text-ink">
              Melhor custo
            </span>
            <h3 className="mt-5 font-display text-4xl text-cream md:text-5xl">{featured.title}</h3>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-cream/75">{featured.subtitle}</p>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {featured.includes.map(item => (
                <li key={item} className="flex gap-3 text-cream/90">
                  <span className="text-lime">✓</span>{item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-end gap-x-6 gap-y-4">
              <div>
                {featured.oldPrice && (
                  <span className="block font-label text-sm text-cream/50 line-through">{brl(featured.oldPrice)}</span>
                )}
                <span className="font-display text-5xl text-cream">{brl(featured.price)}</span>
              </div>
              <BuyButton book={featured} primary />
            </div>
          </div>
        </Reveal>

        {/* Avulsos */}
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {singles.map((book, i) => (
            <Reveal as="article" key={book.id} delay={i * 120} className="flex flex-col rounded-[2rem] bg-paper p-8">
              <div className="flex justify-center rounded-2xl bg-cream py-10">
                <Cover book={book} />
              </div>
              <h3 className="mt-8 font-display text-3xl text-ink">{book.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{book.subtitle}</p>
              <ul className="mt-5 space-y-2 text-[15px] text-ink">
                {book.includes.map(item => (
                  <li key={item} className="flex gap-3"><span className="text-leaf">✓</span>{item}</li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
                <span className="font-display text-3xl text-ink">{brl(book.price)}</span>
                <BuyButton book={book} />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex flex-col items-center gap-2 text-center text-sm text-ink-soft sm:flex-row sm:justify-center sm:gap-8">
          <span>Feito por nutricionistas</span>
          <span className="hidden h-1 w-1 rounded-full bg-ink/30 sm:block" />
          <span>Entrega imediata em PDF</span>
          <span className="hidden h-1 w-1 rounded-full bg-ink/30 sm:block" />
          <span>Pagamento seguro</span>
          <span className="hidden h-1 w-1 rounded-full bg-ink/30 sm:block" />
          <span>7 dias de garantia</span>
        </Reveal>
      </div>
    </section>
  );
}
