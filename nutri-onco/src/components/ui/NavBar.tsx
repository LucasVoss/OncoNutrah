'use client';
import { useEffect, useState } from 'react';
import { nav, site } from '@/content/site';
import Logo from './Logo';

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled || menuOpen ? 'bg-paper/90 backdrop-blur-md border-b border-line' : 'bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <a href="#inicio" className="flex items-center gap-2.5 text-leaf" aria-label={site.brand}>
          <Logo className="h-9 w-9" />
          <span className="font-display text-xl leading-none">{site.brand}</span>
        </a>
        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {nav.map(l => (
            <a key={l.href} href={l.href} className="font-label text-xs uppercase tracking-[0.16em] text-ink-soft hover:text-leaf transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#ebooks" className="rounded-full bg-ink px-5 py-2.5 font-label text-xs uppercase tracking-[0.16em] text-cream hover:bg-leaf transition-colors">
            Ebooks
          </a>
        </div>
        {/* Mobile toggle */}
        <button
          className="lg:hidden flex flex-col gap-1.5 w-6 py-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
        >
          <span className={`block h-px bg-ink transition-all ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block h-px bg-ink transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-px bg-ink transition-all ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden px-6 pb-6 pt-2 flex flex-col gap-5">
          {nav.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              className="font-label text-sm uppercase tracking-[0.16em] text-ink-soft hover:text-leaf">
              {l.label}
            </a>
          ))}
          <a href="#ebooks" onClick={() => setMenuOpen(false)}
            className="mt-1 rounded-full bg-ink px-5 py-3 text-center font-label text-sm uppercase tracking-[0.16em] text-cream">
            Ver os ebooks
          </a>
        </div>
      )}
    </nav>
  );
}
