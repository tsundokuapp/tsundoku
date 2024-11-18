// components/ProgressBar.tsx
import React from 'react';

import type { ScrollMode } from '@/@types/ScrollMode';

interface ProgressBarProps {
  totalSteps: number;
  progressStep: number;
  scrollMode: ScrollMode;
  onPageChange?: (setPage: number) => void;
}

export function ProgressBar({
  totalSteps,
  progressStep,
  scrollMode,
  ...props
}: ProgressBarProps) {
  if (scrollMode === 'double' && progressStep % 2 !== 0) {
    progressStep++;
  }

  const handlePageChange = (pageNumber: number) => {
    progressStep = pageNumber;
    props.onPageChange?.(pageNumber);
  };

  return (
    <div
      className="fixed bottom-0 left-0 w-full bg-white shadow-inner dark:bg-zinc-950"
      {...props}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center">
          {Array.from({ length: totalSteps }).map((_, index) => {
            const page = index + 1;
            const isRead = page <= progressStep;

            return (
              <div
                key={page}
                data-read={isRead}
                className="group relative flex-1 cursor-pointer items-center justify-center px-1 py-2"
                onClick={() => handlePageChange(page)}
              >
                <div
                  className={
                    'mx-1 h-1 flex-1 rounded bg-zinc-500 group-data-[read=true]:bg-blue-500 group-data-[read=true]:dark:bg-slate-700'
                  }
                >
                  <div
                    className={
                      'before:mx-auto" absolute -top-10 left-0 right-0 mx-auto hidden w-10 max-w-xs select-none rounded bg-black px-3 py-[6px] text-center text-[13px] font-semibold text-white shadow-lg before:absolute before:-bottom-1 before:left-3 before:right-0 before:z-[-1] before:h-4 before:w-4 before:rotate-45 before:bg-black group-hover:block'
                    }
                  >
                    {page}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <span className="mx-4 w-14 text-center text-sm font-medium">
          {((progressStep / totalSteps) * 100).toFixed(2)}%
        </span>
      </div>
    </div>
  );
}

/*
PONTOS DE MELHORIA:
- Separar o progress bar em componentes menores, e melhorar a leitura das informa;ões;
- Mudar a forma como identifica a contagem double;
- Criar o componente Tooltip para reutilização;
- Ajustar melhor o posicionamento do tooltip de página;
- Remover a %?
*/
