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
    <div className="flex w-full flex-col justify-between gap-5 rounded-md bg-primaryContrast px-4 py-4">
      <header className="flex flex-row items-center justify-start gap-1">
        <div className="mx-2 flex rounded-full bg-slate-900 p-2 text-white">
          {textTooltip ? (
            <Tooltip text={textTooltip}>{icon as JSX.Element}</Tooltip>
          ) : (
            (icon as JSX.Element)
          )}
        </div>
        <p className="max-w-20 text-wrap text-sm text-white">{title}</p>
      </header>

      <div className="ml-4 flex flex-row items-center justify-between">
        <p className="text-3xl font-bold text-white">{data.value}</p>
        <div className="flex justify-center">
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
