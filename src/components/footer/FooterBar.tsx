// Color Checked
// Components Checked
import Link from 'next/link';

import { FooterLink } from './FooterLink';

export function FooterBar() {
  return (
    <footer className="w-full bg-appFooterBackground py-4 sm:py-6">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center justify-between px-4 sm:flex-row sm:px-8 lg:px-16">
        <div>
          <Link
            className="flex items-center gap-2 text-xl font-extrabold text-appFooterText"
            href="/"
          >
            <span className="text-appFooterHighlight">/</span>
            Tsundoku
            <span className="text-appFooterHighlight">/</span>
          </Link>
        </div>
        <div className="flex items-center gap-4 sm:gap-8">
          <FooterLink text="dcma" action="dcma/" />
          <FooterLink text="Contato" action="contact/" />
        </div>
      </div>
    </footer>
  );
}
