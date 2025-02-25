import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { merge } from '@/helpers/twUtils';

interface BannerProps {
  className?: string;
  children?: ReactNode;
  image: string;
  link?: string;
}

export function Banner({
  children,
  className,
  image,
  link,
  ...props
}: BannerProps) {
  return (
    <Link href={link || '#'}>
      <div
        className={merge(
          'flex h-72 items-center justify-center overflow-hidden rounded-md bg-appBannerBackground text-appBannerText',
          className,
        )}
        {...props}
      >
        <Image
          src={image}
          height={400}
          width={400}
          alt="Recrutamento de editores"
        />
        {children}
      </div>
    </Link>
  );
}
