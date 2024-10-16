import Link from 'next/link';

import { FooterLink } from './FooterLink';
export function Footer() {
  return (
    <footer className="flex h-[120px] items-center justify-between bg-gray-300 px-[180px]">
      <div className="flex items-center">
        <Link
          className="flex items-center gap-2 text-2xl font-extrabold text-gray-800"
          href="/"
        >
          <span className="text-gray-950">/</span>
          Tsundoku
          <span className="text-gray-950">/</span>
        </Link>
      </div>
      <div className="flex items-center gap-8">
        <FooterLink text="dcma" action="dcma/" />
        <FooterLink text="Contato" action="contact/" />
      </div>
    </footer>
  );
}
