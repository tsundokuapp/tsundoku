'use client';

import { ArrowFatUp } from '@phosphor-icons/react/dist/ssr';

import { Tooltip } from '@/components/common/tooltip/Tooltip';

interface CardInfoProps {
  icon: unknown;
  title: string;
  data: { value: string };
  positive?: boolean;
  textTooltip?: string;
}

export const CardInfo = ({
  icon,
  title,
  data,
  positive,
  textTooltip,
}: CardInfoProps) => {
  return (
    <div className="bg-primaryContrast flex w-full flex-row justify-between gap-5 rounded-md p-2 md:flex-col md:p-4">
      <header className="flex flex-row items-center justify-start gap-1">
        <div className="bg-appPrimary mx-2 hidden rounded-full p-2 text-white md:flex">
          {textTooltip ? (
            <Tooltip text={textTooltip}>{icon as JSX.Element}</Tooltip>
          ) : (
            (icon as JSX.Element)
          )}
        </div>
        <p className="max-w-20 text-wrap text-sm text-white">{title}</p>
      </header>

      <div className="ml-4 flex flex-row items-center justify-between">
        <p className="text-2xl font-bold text-white md:text-3xl">
          {data.value}
        </p>
        <div className="hidden justify-center md:flex">
          <span>
            {
              <ArrowFatUp
                weight="fill"
                size={24}
                color={positive ? '#16a34a' : '#b91c1c'}
              />
            }
          </span>
          <span
            className={`ml-1 text-sm ${positive ? 'text-success' : 'text-error'}`}
          >
            24.0%
          </span>
        </div>
      </div>
    </div>
  );
};
