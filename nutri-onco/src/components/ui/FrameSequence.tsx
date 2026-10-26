'use client';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { preload } from 'react-dom';
import { useScrollFrame } from '@/hooks/useScrollFrame';

// Progresso 0–100 do scroll, disponível para os overlays filhos
const ProgressContext = createContext(0);
export const useFrameProgress = () => useContext(ProgressContext);

interface FrameSequenceProps {
  framesPath: string;
  framePrefix?: string;
  zeroPad?: number;
  ext?: string;
  totalFrames: number;
  height?: string;
  children?: React.ReactNode;
  id?: string;
  /** Cor de fundo atrás da imagem (igual ao fundo do vídeo) */
  background?: string;
  /** Ponto horizontal (0–1) mantido no centro quando a imagem é cortada nas laterais */
  focusX?: number;
  /** Em telas retrato, recorte horizontal [início, fim] (0–1) que ocupa toda a largura */
  portraitBand?: [number, number];
  /** Em telas retrato, distância do topo (fração da altura) onde a imagem começa */
  portraitTop?: number;
  /** Suavização do scrub: 1 = sem suavização, menor = mais "cinematográfico" */
  smoothing?: number;
  /** Escala da imagem em relação ao enquadramento padrão (1 = preenche; <1 = menor) */
  scale?: number;
  /** Ponto horizontal (0–1) da imagem que fica parado quando a escala diminui */
  subjectX?: number;
  /** Pasta com a versão em alta resolução (ex.: 4K), usada só em telas que aproveitam */
  hiResPath?: string;
  /** Largura mínima, em pixels reais, que a imagem precisa ocupar para usar hiResPath */
  hiResMinWidth?: number;
}

// Cor de fundo em hex → rgba transparente, para o degradê das bordas
const transparentOf = (hex: string) => {
  const n = parseInt(hex.replace('#', '').slice(0, 6), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},0)`;
};

export default function FrameSequence({
  framesPath,
  framePrefix = 'frame_',
  zeroPad = 4,
  ext = 'webp',
  totalFrames,
  height = '300vh',
  children,
  id,
  background = '#FFFFFF',
  focusX = 0.5,
  portraitBand = [0, 1],
  portraitTop = 0.1,
  smoothing = 0.18,
  scale = 1,
  subjectX = 0.5,
  hiResPath,
  hiResMinWidth = 2000,
}: FrameSequenceProps) {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const readTargetFrame = useScrollFrame(containerRef, totalFrames);

  // Gera URL do frame com zero-padding
  const getFrameUrl = (index: number, path = framesPath) => {
    const padded = String(index + 1).padStart(zeroPad, '0');
    return `${path}/${framePrefix}${padded}.${ext}`;
  };

  preload(getFrameUrl(0), { as: 'image', fetchPriority: 'high' });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !container || !ctx) return;

    const images = Array.from({ length: totalFrames }, () => new Image());
    let current = readTargetFrame();
    let drawn = -1;
    let raf = 0;
    let running = false;
    let lastProgress = -1;

    const isLoaded = (img?: HTMLImageElement) => !!img && img.complete && img.naturalWidth > 0;

    // Se o frame pedido ainda não chegou, usa o carregado mais próximo
    const nearestLoaded = (index: number) => {
      for (let d = 0; d < totalFrames; d++) {
        if (isLoaded(images[index - d])) return images[index - d];
        if (isLoaded(images[index + d])) return images[index + d];
      }
      return null;
    };

    const syncCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      drawn = -1;
    };

    // position é fracionário: desenha o frame de baixo e o de cima por cima com
    // alpha = fração, o que deixa o scrub fluido com menos frames no disco
    const drawFrame = (position: number) => {
      const base = Math.floor(position);
      const img = nearestLoaded(base);
      if (!img) return false;
      const t = position - base;
      const next = t > 0.01 && isLoaded(images[base + 1]) ? images[base + 1] : null;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const canvasRatio = cw / ch;
      let dx: number, dy: number, dw: number, dh: number;

      if (canvasRatio < 1) {
        // Retrato (mobile): a faixa onde está o assunto ocupa toda a largura,
        // o resto do canvas fica com a cor de fundo do vídeo
        const [b0, b1] = portraitBand;
        const fit = cw / ((b1 - b0) * iw);
        dw = iw * fit;
        dh = ih * fit;
        dx = -b0 * iw * fit;
        dy = ch * portraitTop;
      } else if (iw / ih > canvasRatio) {
        // Cover cortando as laterais, mantendo focusX visível
        dh = ch;
        dw = ch * (iw / ih);
        dx = (cw - dw) * focusX;
        dy = 0;
      } else {
        dw = cw;
        dh = cw / (iw / ih);
        dx = 0;
        dy = (ch - dh) / 2;
      }

      if (scale !== 1) {
        // Encolhe em torno do assunto (subjectX, meio da imagem): o bowl fica no lugar
        const ax = dx + dw * subjectX;
        const ay = dy + dh / 2;
        dx = ax + (dx - ax) * scale;
        dy = ay + (dy - ay) * scale;
        dw *= scale;
        dh *= scale;
      }

      ctx.fillStyle = background;
      ctx.fillRect(0, 0, cw, ch);
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, dx, dy, dw, dh);
      if (next) {
        ctx.globalAlpha = t;
        ctx.drawImage(next, dx, dy, dw, dh);
        ctx.globalAlpha = 1;
      }

      // Bordas da imagem que caem dentro do canvas viram degradê para o fundo,
      // assim ingredientes que encostam na borda do vídeo não ficam cortados a seco
      const f = Math.min(dw, dh) * 0.12;
      const clear = transparentOf(background);
      // [x, y, largura, altura, de onde parte o degradê (x0,y0 → x1,y1), borda visível?]
      const edges: [number, number, number, number, number, number, number, number, boolean][] = [
        [dx, dy, dw, f, dx, dy, dx, dy + f, dy > 0],                                 // topo
        [dx, dy + dh - f, dw, f, dx, dy + dh, dx, dy + dh - f, dy + dh < ch],        // base
        [dx, dy, f, dh, dx, dy, dx + f, dy, dx > 0],                                 // esquerda
        [dx + dw - f, dy, f, dh, dx + dw, dy, dx + dw - f, dy, dx + dw < cw],        // direita
      ];
      for (const [x, y, w, h, x0, y0, x1, y1, visible] of edges) {
        if (!visible) continue;
        const g = ctx.createLinearGradient(x0, y0, x1, y1);
        g.addColorStop(0, background);
        g.addColorStop(1, clear);
        ctx.fillStyle = g;
        ctx.fillRect(x, y, w, h);
      }
      return true;
    };

    let lastTarget = -1;
    let lastMove = 0;

    const tick = (now: number) => {
      const scrollTarget = readTargetFrame();
      if (scrollTarget !== lastTarget) { lastTarget = scrollTarget; lastMove = now; }
      // Parado: assenta no frame inteiro mais próximo, sem mistura (imagem nítida)
      const target = now - lastMove > 140 ? Math.round(scrollTarget) : scrollTarget;

      current += (target - current) * smoothing;
      if (Math.abs(target - current) < 0.01) current = target;

      // Redesenha só quando a posição muda de forma perceptível
      const pos = Math.round(current * 50) / 50;
      if (pos !== drawn && drawFrame(pos)) drawn = pos;

      const p = Math.round((scrollTarget / (totalFrames - 1)) * 1000) / 10;
      if (p !== lastProgress) {
        lastProgress = p;
        setProgress(p);
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // Ordem de carregamento: primeiro frame, um "esqueleto" a cada 8 frames
    // (o scrub já funciona cedo) e depois o resto quando o navegador estiver ocioso
    const load = (i: number) => {
      if (images[i].src) return;
      images[i].onload = () => {
        if (Math.abs(i - current) < 8) drawn = -1;
        if (!running) drawFrame(current);
      };
      images[i].src = getFrameUrl(i, path);
    };

    syncCanvasSize();
    // 4K só onde a imagem realmente ocupa muitos pixels (telas grandes / Retina);
    // celulares e notebooks comuns baixam a versão HD, bem mais leve
    const path = hiResPath && canvas.width * scale >= hiResMinWidth ? hiResPath : framesPath;
    load(0);
    for (let i = 8; i < totalFrames; i += 8) load(i);
    load(totalFrames - 1);

    const loadRest = () => { for (let i = 0; i < totalFrames; i++) load(i); };
    const hasIdle = typeof window.requestIdleCallback === 'function';
    const idle = hasIdle
      ? window.requestIdleCallback(loadRest, { timeout: 1500 })
      : setTimeout(loadRest, 300) as unknown as number;

    // Só anima enquanto o hero estiver na tela
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start(); else stop();
    });
    observer.observe(container);

    const onResize = () => {
      syncCanvasSize();
      drawFrame(current);
    };
    window.addEventListener('resize', onResize);

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      if (hasIdle) window.cancelIdleCallback(idle);
      else clearTimeout(idle);
      images.forEach(img => { img.onload = null; });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalFrames, framesPath, background, focusX, portraitBand[0], portraitBand[1], portraitTop, smoothing, scale, subjectX, hiResPath, hiResMinWidth]);

  return (
    <section ref={containerRef} id={id} style={{ height }} className="relative w-full">
      <div className="sticky top-0 h-svh w-full overflow-hidden" style={{ background }}>
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
        {/* Fade para a seção seguinte */}
        <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none bg-gradient-to-b from-transparent to-paper" />
        <ProgressContext.Provider value={progress}>{children}</ProgressContext.Provider>
      </div>
    </section>
  );
}
