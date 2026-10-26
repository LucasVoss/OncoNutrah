import NavBar from '@/components/ui/NavBar';
import FrameSequence from '@/components/ui/FrameSequence';
import HeroOverlays from '@/components/sections/HeroOverlays';
import Comece from '@/components/sections/Comece';
import Sintomas from '@/components/sections/Sintomas';
import Pilares from '@/components/sections/Pilares';
import Mitos from '@/components/sections/Mitos';
import Ebooks from '@/components/sections/Ebooks';
import Autora from '@/components/sections/Autora';
import Faq from '@/components/sections/Faq';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <main className="grain bg-paper">
      <NavBar />
      <FrameSequence
        framesPath="/frames/loop"
        hiResPath="/frames/loop-4k"   // 3840px, só em telas grandes / Retina
        totalFrames={96}      // extract_frames.py: 8s a 12fps, 1920px AVIF
        ext="avif"
        height="520vh"
        id="inicio"
        focusX={0.85}         // o bowl fica à direita do vídeo
        portraitBand={[0.44, 0.98]}
        portraitTop={0.07}
        scale={0.82}          // vídeo um pouco menor que a tela, centrado no bowl
        subjectX={0.69}
      >
        <HeroOverlays />
      </FrameSequence>
      <Comece />
      <Sintomas />
      <Pilares />
      <Mitos />
      <Ebooks />
      <Autora />
      <Faq />
      <Footer />
    </main>
  );
}
