import Logo from '@/components/ui/Logo';
import { nav, site } from '@/content/site';

export default function Footer() {
  return (
    <footer className="bg-ink px-6 pb-10 pt-20 text-cream/70">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5 text-cream">
              <Logo badge className="h-10 w-10" />
              <span className="font-display text-2xl">{site.brand}</span>
            </div>
            <p className="mt-5 max-w-sm leading-relaxed">{site.description}</p>
          </div>
          <div>
            <p className="font-label text-[11px] uppercase tracking-[0.2em] text-lime">Navegue</p>
            <ul className="mt-5 space-y-3">
              {[...nav, { href: '#ebooks', label: 'Ebooks' }].map(l => (
                <li key={l.href}><a href={l.href} className="hover:text-cream">{l.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-label text-[11px] uppercase tracking-[0.2em] text-lime">Contato</p>
            <ul className="mt-5 space-y-3">
              <li><a href={site.whatsappUrl} target="_blank" rel="noopener" className="hover:text-cream">WhatsApp</a></li>
              <li><a href={site.instagramUrl} target="_blank" rel="noopener" className="hover:text-cream">Instagram</a></li>            </ul>
            <p className="mt-8 font-label text-[11px] uppercase tracking-[0.2em] text-lime">Fontes confiáveis</p>
            <ul className="mt-5 space-y-3">
              <li><a href="https://www.gov.br/inca" target="_blank" rel="noopener" className="hover:text-cream">INCA · Instituto Nacional de Câncer</a></li>
            </ul>
          </div>
        </div>

        <p className="mt-16 border-t border-cream/10 pt-8 text-sm leading-relaxed text-cream/50">
          Conteúdo educativo. Não substitui diagnóstico, prescrição ou acompanhamento individual com médico e nutricionista.
          Em emergências, procure o pronto-atendimento mais próximo ou ligue 192 (SAMU).
        </p>
        <p className="mt-4 font-label text-[11px] tracking-[0.15em] text-cream/40">
          © 2026 {site.brand}
        </p>
      </div>
    </footer>
  );
}
