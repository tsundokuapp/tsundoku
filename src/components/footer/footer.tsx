import Link from 'next/link';

import { FooterLink } from './footer-link';
export function Footer() {
  return (
    <div className="flex items-center justify-between bg-gray-300 h-[120px] px-[180px]">
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
    </div>
  );
}
