import Image from 'next/image';
import icon from '../../../public/images/logo-icon.png';

// Ícone da marca (maçã com curativo). `badge` põe o ícone sobre um círculo claro,
// necessário em fundos escuros: o curativo é branco e sumiria.
export default function Logo({ className = '', badge = false }: { className?: string; badge?: boolean }) {
  const img = <Image src={icon} alt="" aria-hidden="true" sizes="64px" className="h-full w-full" />;
  if (!badge) return <span className={`block ${className}`}>{img}</span>;
  return <span className={`block rounded-full bg-paper p-0.5 ${className}`}>{img}</span>;
}
