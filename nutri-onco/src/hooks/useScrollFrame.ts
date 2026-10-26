import { RefObject } from 'react';

// Progresso (0–1) do scroll dentro de um container "sticky": 0 quando o topo encosta
// no topo da janela, 1 quando o fim do container encosta no fim da janela.
export function getScrollProgress(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const scrollable = el.offsetHeight - window.innerHeight;
  if (scrollable <= 0) return 0;
  return Math.min(Math.max(-rect.top / scrollable, 0), 1);
}

export function useScrollFrame(containerRef: RefObject<HTMLElement | null>, totalFrames: number) {
  // Lido dentro do loop de rAF do FrameSequence, sem setState a cada scroll.
  return () => {
    const el = containerRef.current;
    if (!el) return 0;
    return getScrollProgress(el) * (totalFrames - 1);
  };
}
