import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';
import { LINK_DISCORD } from '@/shared/utils/systemValues';

import { Banner } from './banner';
import { LinkButton } from '../LinkButton';

interface BannerRecruitmentProps extends ComponentProps<'div'> {
  className?: string;
}

export function BannerRecruitment({
  className,
  ...props
}: BannerRecruitmentProps) {
  return (
    <Banner
      className={cn(
        'flex flex-1 flex-col items-center justify-center rounded-lg bg-appBannerBackground p-4 text-appBannerText sm:rounded-3xl',
        'gap-4 sm:gap-6 sm:p-6 md:p-8',
        'mx-auto w-full min-w-64 lg:min-w-[420px] xl:min-w-[460px]',
        className,
      )}
      {...props}
    >
      <div className="flex flex-col items-center">
        <span className="text-lg sm:text-xl">
          Gostaria de fazer parte da nossa staff?
        </span>
        <span className="text-xl font-bold uppercase sm:text-2xl">
          Estamos Recrutando
        </span>
      </div>
      <LinkButton
        action={LINK_DISCORD}
        text="Me inscrever"
        className={cn(
          'flex h-12 w-full max-w-xs items-center justify-center rounded-md bg-appBannerButton',
          'font-bold uppercase hover:bg-appBannerButtonHover',
        )}
      />
    </Banner>
  );
}
