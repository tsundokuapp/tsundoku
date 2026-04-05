import Link from 'next/link';
import type { CSSProperties } from 'react';

import { AuthCoverTile } from './AuthCoverTile';

const coverPool = [
  '/cover-alya.webp',
  '/cover-seven.webp',
  '/cover-shadow.webp',
  '/banner-bocchi.jpg',
  '/banner-elaina.jpg',
  '/banner-emilia.jpg',
  '/honrado.jpeg',
  '/comic-example/0.jpg',
  '/comic-example/1.jpg',
  '/comic-example/2.jpg',
  '/comic-example/3.jpg',
  '/comic-example/4.jpg',
  '/comic-example/5.jpg',
  '/comic-example/teste.jpg',
];

const buildDynamicCoverWall = () => {
  const shuffled = [...coverPool].sort(() => Math.random() - 0.5);
  return Array.from(
    { length: 24 },
    (_, index) => shuffled[index % shuffled.length],
  );
};

const authThemeVars = {
  '--auth-background': '#071529',
  '--auth-text': '#e2e8f0',
  '--auth-title': '#f8fafc',
  '--auth-subtitle': '#94a3b8',
  '--auth-highlight': '#00a6ff',
  '--auth-header-text': '#f8fafc',
  '--auth-header-highlight': '#00a6ff',
  '--auth-card-background': 'rgba(20, 40, 71, 0.94)',
  '--auth-card-border': 'rgba(94, 115, 143, 0.7)',
  '--auth-card-shadow': 'rgba(3, 8, 20, 0.55)',
  '--auth-panel-background': 'rgba(10, 29, 56, 0.92)',
  '--auth-panel-border': 'rgba(94, 115, 143, 0.35)',
  '--auth-button-background': '#33465f',
  '--auth-button-border': '#4a5f79',
  '--auth-button-text': '#f8fafc',
  '--auth-button-hover': '#2d5377',
  '--auth-input-background': '#f8fafc',
  '--auth-input-border': '#cbd5e1',
  '--auth-input-text': '#334155',
  '--auth-input-placeholder': '#64748b',
  '--auth-input-icon': '#64748b',
  '--auth-input-focus': '#00a6ff',
  '--auth-separator': 'rgba(148, 163, 184, 0.35)',
  '--auth-error-background': 'rgba(239, 68, 68, 0.12)',
  '--auth-error-border': 'rgba(248, 113, 113, 0.4)',
  '--auth-error-text': '#fecaca',
  '--auth-wall-gradient':
    'linear-gradient(180deg, rgba(7,32,66,0.70) 0%, rgba(6,21,46,0.82) 45%, rgba(6,15,34,0.92) 100%)',
  '--auth-wall-radial':
    'radial-gradient(120% 90% at 50% 15%, rgba(53,120,209,0.40) 0%, rgba(13,29,54,0.25) 35%, rgba(6,15,34,0.15) 100%)',
  '--auth-wall-grid':
    'linear-gradient(rgba(56,132,229,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(56,132,229,0.08) 1px, transparent 1px)',
  '--auth-glow-1': '#3b82f633',
  '--auth-glow-2': '#22d3ee26',
} as CSSProperties;

export default function AuthGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const coverWall = buildDynamicCoverWall();

  return (
    <main
      style={authThemeVars}
      className="bg-authBackground text-authText relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-6 sm:px-6"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-4 gap-2 p-2 opacity-35 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8">
          {coverWall.map((cover, index) => (
            <AuthCoverTile
              key={`${cover}-${index}`}
              src={cover}
              alt="Capa decorativa"
              sizes="(max-width: 768px) 25vw, (max-width: 1200px) 16vw, 12vw"
              priority={index < 8}
            />
          ))}
        </div>

        <div
          className="absolute inset-0"
          style={{ backgroundImage: 'var(--auth-wall-gradient)' }}
        />
        <div
          className="absolute inset-0"
          style={{ backgroundImage: 'var(--auth-wall-radial)' }}
        />
        <div
          className="absolute inset-0 bg-[length:24px_24px]"
          style={{ backgroundImage: 'var(--auth-wall-grid)' }}
        />
        <div
          className="absolute left-[8%] top-[15%] h-52 w-52 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--auth-glow-1)' }}
        />
        <div
          className="absolute bottom-[8%] right-[10%] h-64 w-64 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--auth-glow-2)' }}
        />
      </div>

      <section className="border-authCardBorder bg-authCardBackground relative z-10 w-full max-w-md rounded-2xl border p-5 shadow-2xl backdrop-blur-lg sm:p-6">
        <header className="mb-5 flex flex-col items-center gap-2 text-center">
          <span className="border-authPanelBorder bg-authPanelBackground text-authSubtitle mb-3 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]">
            Comunidade de Leitores
          </span>

          <Link
            href="/"
            className="text-authHeaderText flex items-center gap-1 text-3xl font-extrabold leading-none"
          >
            <span className="text-authHeaderHighlight font-black">/</span>
            <span>Tsundoku</span>
            <span className="text-authHeaderHighlight font-black">/</span>
          </Link>
        </header>

        {children}

        <footer className="border-authSeparator text-authSubtitle mt-5 border-t pt-4 text-center text-xs">
          <p className="tracking-wide">Light Novels e Mangás</p>
          <p className="text-authSubtitle/75 mt-2">Tsundoku &copy; - 2026</p>
        </footer>
      </section>
    </main>
  );
}
