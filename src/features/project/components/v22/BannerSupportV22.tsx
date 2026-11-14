'use client';

import Image from 'next/image';

import { BLUR_DATA_URL } from '@/shared/utils/image';
import { LINK_DISCORD } from '@/shared/utils/systemValues';

// TODO(backend-integration): Caso a equipe confirme links oficiais de pagamento (ex.: Padrim/PIX ou assinaturas via Torii), atualizar os destinos e textos correspondentes neste banner.
export function BannerSupportV22() {
  return (
    <a
      href={LINK_DISCORD}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Apoiar a Tsundoku Traduções na comunidade oficial no Discord"
      className="group relative flex min-h-[150px] w-full flex-col overflow-hidden rounded-xl border border-appCardBorder bg-gradient-to-r from-[#2371b8] via-[#2f86cf] to-[#1d5894] text-white shadow-sm transition-opacity hover:opacity-95 md:flex-row md:items-stretch"
    >
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-4 text-center">
        <p className="text-sm font-bold sm:text-base">
          Gostaria de apoiar a Tsundoku Traduções?
        </p>
        <p className="mt-1.5 max-w-[540px] font-mono text-xs leading-relaxed text-white/95 sm:text-sm">
          Participe da nossa comunidade oficial no Discord para acompanhar os
          lançamentos e saber como fortalecer o projeto.
        </p>
        <span className="mt-2 font-mono text-xs font-bold tracking-wide text-white underline underline-offset-4">
          Acessar comunidade no Discord
        </span>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-white/25 px-6 py-4 md:w-[340px] md:shrink-0 md:border-l md:border-t-0">
        <div className="text-center font-mono text-xs font-semibold leading-snug tracking-wide sm:text-sm">
          A TSUNDOKU
          <br />
          TRADUÇÕES
          <br />
          AGRADECE A
          <br />
          SUA AJUDA!
        </div>

        <div className="relative h-[108px] w-[132px] shrink-0 overflow-hidden rounded-lg border border-white/20 bg-white/10">
          <Image
            src="/recrutamento-editor.png"
            alt="Equipe Tsundoku"
            fill
            sizes="140px"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover"
          />
        </div>
      </div>
    </a>
  );
}
