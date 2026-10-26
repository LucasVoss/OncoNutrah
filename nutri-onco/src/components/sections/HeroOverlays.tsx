'use client';
import { useFrameProgress } from '@/components/ui/FrameSequence';

function getOpacity(progress: number, start: number, end: number, fade = 6): number {
  if (progress < start - fade || progress > end + fade) return 0;
  if (progress >= start && progress <= end) return 1;
  if (progress < start) return (progress - (start - fade)) / fade;
  return 1 - (progress - end) / fade;
}

const chapters = [
  { start: 0, end: 18 },
  { start: 36, end: 58 },
  { start: 76, end: 100 },
];

function Chapter({ opacity, children }: { opacity: number; children: React.ReactNode }) {
  return (
    <div
      className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-paper from-75% to-transparent px-6 pb-10 pt-12 sm:pb-20 lg:inset-y-0 lg:right-auto lg:flex lg:w-[46vw] lg:max-w-2xl lg:items-center lg:bg-none lg:pb-0 lg:pl-[7vw] lg:pt-0"
      style={{
        opacity,
        transform: `translateY(${(1 - opacity) * 24}px)`,
        pointerEvents: opacity > 0.5 ? 'auto' : 'none',
        visibility: opacity === 0 ? 'hidden' : 'visible',
      }}
    >
      <div>{children}</div>
    </div>
  );
}

export default function HeroOverlays() {
  const progress = useFrameProgress();
  const [o1, o2, o3] = chapters.map(c => getOpacity(progress, c.start, c.end));
  const active = progress < 27 ? 0 : progress < 67 ? 1 : 2;

  return (
    <div className="absolute inset-0">
      <Chapter opacity={o1}>
        <p className="font-label text-xs uppercase tracking-[0.22em] text-leaf">Nutrição no tratamento do câncer</p>
        <h1 className="mt-4 font-display text-[2.35rem] leading-[1.02] text-ink sm:mt-5 sm:text-6xl xl:text-7xl">
          Comer bem também faz parte do <em className="text-leaf">tratamento.</em>
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft sm:mt-6 sm:text-lg">
          Um guia para quem recebeu um diagnóstico e quer saber como se alimentar, sintoma por sintoma, sem achismo.
        </p>
        <div className="mt-6 flex flex-wrap gap-2.5 sm:mt-8 sm:gap-3">
          <a href="#comece" className="rounded-full bg-ink px-5 py-3.5 font-label text-[11px] uppercase tracking-[0.14em] text-cream hover:bg-leaf transition-colors sm:px-6 sm:text-xs sm:tracking-[0.16em]">
            Começar pelo guia
          </a>
          <a href="#ebooks" className="rounded-full border border-ink/20 bg-paper/70 px-5 py-3.5 font-label text-[11px] uppercase tracking-[0.14em] text-ink hover:border-leaf hover:text-leaf transition-colors sm:px-6 sm:text-xs sm:tracking-[0.16em]">
            Ver os ebooks
          </a>
        </div>
      </Chapter>

      <Chapter opacity={o2}>
        <p className="font-label text-xs uppercase tracking-[0.22em] text-tomato">Cada ingrediente tem um papel</p>
        <h2 className="mt-5 font-display text-4xl leading-[1.05] text-ink sm:text-5xl xl:text-6xl">
          Proteína para manter a força. Água, fibras e cor para o corpo <em className="text-leaf">atravessar</em> o tratamento.
        </h2>
      </Chapter>

      <Chapter opacity={o3}>
        <p className="font-label text-xs uppercase tracking-[0.22em] text-cabbage">Informação para os dias de dúvida</p>
        <h2 className="mt-5 font-display text-4xl leading-[1.05] text-ink sm:text-5xl xl:text-6xl">
          Você não precisa descobrir tudo <em className="text-leaf">sozinho.</em>
        </h2>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
          Os sintomas mais comuns explicados aqui, de graça. E guias completos para quando você quiser ir além.
        </p>
        <a href="#sintomas" className="mt-8 inline-block rounded-full bg-ink px-6 py-3.5 font-label text-xs uppercase tracking-[0.16em] text-cream hover:bg-leaf transition-colors">
          Ver guia de sintomas
        </a>
      </Chapter>

      {/* Indicador de capítulo */}
      <div className="absolute right-6 top-24 hidden items-center gap-3 font-label text-[11px] tracking-[0.2em] text-ink-soft sm:flex lg:right-10">
        <span className="text-ink">0{active + 1}</span>
        <span className="relative h-px w-16 bg-ink/15">
          <span className="absolute inset-y-0 left-0 bg-leaf" style={{ width: `${progress}%` }} />
        </span>
        <span>03</span>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-label text-[10px] uppercase tracking-[0.25em] text-ink-soft transition-opacity duration-500 lg:flex"
        style={{ opacity: progress < 4 ? 1 : 0 }}
      >
        Role para ver
        <span className="scroll-bounce block h-6 w-px bg-ink/40" />
      </div>
    </div>
  );
}
