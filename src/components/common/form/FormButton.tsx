import { Spinner } from '@phosphor-icons/react/dist/ssr';

import { merge } from '@/helpers/twUtils';

interface FormButtonProps {
  className?: string;
  isSubmitting: boolean;
}

export const FormButton = ({
  className,
  isSubmitting,
  ...props
}: FormButtonProps) => {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={merge(
        'disable:bg-slate-300 bg-appPrimary mx-auto mt-4 flex w-full max-w-[550px] items-center justify-center rounded-lg border-2 px-4 py-2 font-semibold text-white transition-colors hover:bg-slate-600 dark:border-slate-700',
        className,
      )}
      {...props}
    >
      {isSubmitting ? <Spinner size={24} className="animate-spin" /> : 'Salvar'}
    </button>
  );
};
