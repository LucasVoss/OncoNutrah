'use client';
import { useRef } from 'react';
import { useInView } from '@/hooks/useInView';

// Animação de entrada padrão das seções (fade + leve subida)
export default function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'article';
}) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  const inView = useInView(ref);

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
