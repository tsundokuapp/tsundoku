'use client';

import {
  DiscordLogo,
  EnvelopeSimple,
  FacebookLogo,
  TwitterLogo,
} from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';

import { cn } from '@/shared/utils/cn';
import { LINK_DISCORD } from '@/shared/utils/systemValues';

interface FooterV2Props {
  className?: string;
}

export function FooterV2({ className }: FooterV2Props) {
  return (
    <footer
      className={cn(
        'w-full border-t border-appCardBorder bg-appCardBackground py-6 text-appText',
        className,
      )}
    >
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-center gap-6 px-4 text-center">
        <div className="flex flex-col items-center gap-3">
          <p className="text-xl font-bold sm:text-2xl">Tsundoku Traduções</p>

          <div className="flex items-center gap-6">
            <Link
              href="https://twitter.com/tsundokutrad"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter da Tsundoku"
              className="text-appText transition-colors hover:text-appAccentCyan"
            >
              <TwitterLogo size={24} weight="fill" />
            </Link>
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook da Tsundoku"
              className="text-appText transition-colors hover:text-appAccentCyan"
            >
              <FacebookLogo size={24} weight="fill" />
            </Link>
            <Link
              href={LINK_DISCORD}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord da Tsundoku"
              className="text-appText transition-colors hover:text-appAccentCyan"
            >
              <DiscordLogo size={24} weight="fill" />
            </Link>
            <Link
              href="mailto:tsundokutraducoes@gmail.com"
              aria-label="E-mail da Tsundoku"
              className="text-appText transition-colors hover:text-appAccentCyan"
            >
              <EnvelopeSimple size={24} weight="fill" />
            </Link>
          </div>

          <p className="text-appText/90 text-xs font-semibold sm:text-sm">
            © 2024 Tsundoku Traduções
          </p>
        </div>

        <p className="text-xs font-light text-appSubtitle">
          Desenvolvido pela equipe Tsundoku
        </p>
      </div>
    </footer>
  );
}
