import { ICheckbox } from '@/@types/Checkbox';
import { cn } from '@/helpers/twUtils';

type FakeCheckboxProps = Omit<ICheckbox, 'register' | 'name'>;

export const FakeCheckbox = ({
  label,
  description,
  checked,
  size = 'sm',
  id,
}: FakeCheckboxProps) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex h-5 items-center bg-transparent">
        <input
          id={id || 'helper-faker-checkbox'}
          aria-describedby="helper-faker-checkbox-input"
          checked={checked}
          type="checkbox"
          tabIndex={-1}
          disabled
          className={cn(
            'disabled:border-steel-400 disabled:bg-steel-400 focus-event-none checked:bg-primary focus:ring-primary dark:bg-appPrimary checked:dark:bg-primary dark:focus:ring-primary peer pointer-events-none relative mt-1 shrink-0 appearance-none rounded-sm border-2 border-[#e0e0e0] bg-white checked:border-0 focus:outline-none focus:ring-2 focus:ring-offset-0 dark:border-slate-700 checked:dark:border-0',
            {
              'h-4 w-4': size === 'sm',
              'h-5 w-5': size === 'md',
              'h-6 w-6': size === 'lg',
            },
          )}
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
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
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
          htmlFor="helper-fake-checkbox"
          className="font-medium text-gray-900 dark:text-gray-300"
        >
          {label}
        </label>
        {description && (
          <p
            id="helper-faker-checkbox-text"
            className="flex-wrap text-xs font-normal text-gray-500 dark:text-slate-500"
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
};
