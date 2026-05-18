'use client';

import Image from 'next/image';
import { useState } from 'react';

interface AuthCoverTileProps {
  src: string;
  alt?: string;
  priority?: boolean;
  sizes?: string;
}

export function AuthCoverTile({
  src,
  alt = '',
  priority = false,
  sizes,
}: AuthCoverTileProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-[#0b1d3d]">
      {!hasError ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
          priority={priority}
          onError={() => setHasError(true)}
        />
      ) : (
        <div
          aria-label={alt || 'Imagem indisponível'}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_55%),linear-gradient(180deg,_rgba(11,29,61,0.98)_0%,_rgba(7,18,38,0.98)_100%)] p-2 text-center"
        >
          <span className="border-authSeparator text-authSubtitle rounded-full border px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.22em]">
            Tsundoku
          </span>
          <span className="text-authSubtitle/70 max-w-full truncate text-[10px] font-medium">
            Imagem indisponível
          </span>
        </div>
      )}
    </div>
  );
}
