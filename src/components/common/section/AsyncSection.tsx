// Color Checked
// Components Checked
import { Spinner } from '@phosphor-icons/react/dist/ssr';

import { EnterAnimation } from '@/animation/EnterAnimation';
import { merge } from '@/helpers/twUtils';

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
      <div className={(merge('flex flex-row gap-6'), className)}>
        {isLoading ? (
          <div className="flex h-10 w-full items-center justify-center gap-4">
            <span>Carregando...</span>
            <Spinner size={24} className="animate-spin" />
          </div>
        ) : (
          <EnterAnimation className="flex flex-row flex-wrap gap-6">
            {children}
          </EnterAnimation>
        )}
      </div>
    </section>
  );
};
