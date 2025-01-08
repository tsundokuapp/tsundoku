import { cn } from '@/helpers/twUtils';
import { ICheckbox } from '@/types/Checkbox';

export const Checkbox = ({
  label,
  description,
  name,
  register,
  size = 'sm',
}: ICheckbox) => {
  return (
    <div className="flex">
      <div className="flex h-5 items-center bg-transparent">
        <input
          id="helper-checkbox"
          aria-describedby="helper-checkbox-input"
          type="checkbox"
          className={cn(
            'disabled:border-steel-400 disabled:bg-steel-400 peer relative mt-1 h-4 w-4 shrink-0 appearance-none rounded-sm border-2 border-[#e0e0e0] bg-white checked:border-0 checked:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0 dark:border-slate-700 dark:bg-slate-900 checked:dark:border-0 checked:dark:bg-primary dark:focus:ring-primary',
            {
              'h-4 w-4': size === 'sm',
              'h-5 w-5': size === 'md',
              'h-6 w-6': size === 'lg',
            },
          )}
          {...register(name)}
        />
        <svg
          className={cn(
            'pointer-events-none absolute mt-1 hidden peer-checked:block',
            {
              'h-4 w-4': size === 'sm',
              'h-5 w-5': size === 'md',
              'h-6 w-6': size === 'lg',
            },
          )}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <div
        className={cn('ms-2 text-sm', {
          'text-md': size === 'md' || 'lg',
        })}
      >
        <label
          htmlFor="helper-checkbox"
          className="font-medium text-gray-900 dark:text-gray-300"
        >
          {label}
        </label>
        {description && (
          <p
            id="helper-checkbox-text"
            className="flex-wrap text-xs font-normal text-gray-500 dark:text-slate-500"
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
};
