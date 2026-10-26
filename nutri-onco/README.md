# OncoNutrah: landing page

Guia de nutrição para pacientes oncológicos, com venda de ebooks. O hero usa uma animação de scroll em `<canvas>` feita com os frames do vídeo do bowl.

## Rodar localmente

```bash
npm install
npm run dev        # http://localhost:3000
```

Produção: `npm run build` e depois `npm start`.

## Regerar os frames do vídeo

```bash
py extract_frames.py C:/caminho/realesrgan-ncnn-vulkan.exe   # com upscale por IA (~30 min na GPU)
py extract_frames.py --reuse                                 # só refaz a compressão
py extract_frames.py                                         # sem IA
```

O script lê `../Buddha_bowl_ingredients_levitating_1080p_20261019231659.mp4` e gera 96 frames a 12 fps. Com o [Real-ESRGAN](https://github.com/xinntao/Real-ESRGAN/releases) (modelo `realesrgan-x4plus`), cada frame é ampliado 4x por IA e depois reduzido com nitidez leve para dois conjuntos AVIF:

- `public/frames/loop-4k/`: 3840 px, ~20 MB, carregado só em telas grandes ou Retina
- `public/frames/loop/`: 1920 px, ~10 MB, notebooks comuns e celulares

O `FrameSequence` escolhe o conjunto pela quantidade real de pixels da tela e mistura frames vizinhos durante o scroll, então 12 fps já ficam fluidos. Os PNGs intermediários ficam em `.frames_cache/` (fora do site e do git). Se trocar o vídeo, ajuste `VIDEO_PATH` no script e `totalFrames` em `src/app/page.tsx`.

## Onde editar

| O quê | Arquivo |
|---|---|
| Nome da marca, autora, WhatsApp, Instagram, e-mail | `src/content/site.ts` |
| Ebooks: títulos, preços, links de checkout | `src/content/site.ts` (`ebooks`) |
| Sintomas, pilares, mitos, FAQ | `src/content/guia.ts` |
| Cores e fontes | `src/app/globals.css`, `src/app/layout.tsx` |
| Textos do hero e momento em que aparecem | `src/components/sections/HeroOverlays.tsx` |
| Enquadramento do vídeo (desktop/mobile) | props de `FrameSequence` em `src/app/page.tsx` |

Procure por `TODO` para achar tudo que ainda é placeholder.
