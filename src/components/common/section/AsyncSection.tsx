// Color Checked
// Components Checked
import { Spinner } from '@phosphor-icons/react/dist/ssr';

import { EnterAnimation } from '@/animation/EnterAnimation';
import { cn } from '@/helpers/twUtils';

import { Title } from '../Title';

interface AsyncSectionProps {
  children: React.ReactNode;
  isLoading: boolean;
  title?: string;
  className?: string;
}

export const AsyncSection = ({
  children,
  isLoading,
  title,
  className,
}: AsyncSectionProps) => {
  return (
    <section className="flex flex-col justify-between gap-4">
      {title && <Title title={title} />}
      <div className={(cn('flex flex-row gap-6'), className)}>
        {isLoading ? (
          <div className="flex h-10 w-full items-center justify-center gap-4">
            <span>Carregando...</span>
            <Spinner size={24} className="animate-spin" />
          </div>
        ) : (
          <EnterAnimation className="flex flex-row flex-wrap items-center justify-center gap-6 sm:justify-start">
            {children}
          </EnterAnimation>
        )}
      </div>
    </section>
  );
};
