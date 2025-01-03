import { UseFormRegister } from 'react-hook-form';

interface CheckboxProps {
  title: string;
  description?: string;
  register: UseFormRegister<any>;
  name: string;
}

export const Checkbox = ({
  title,
  description,
  name,
  register,
}: CheckboxProps) => {
  return (
    <div className="flex">
      <div className="flex h-5 items-center bg-transparent">
        <input
          id="helper-checkbox"
          aria-describedby="helper-checkbox-input"
          type="checkbox"
          className="disabled:border-steel-400 disabled:bg-steel-400 peer relative mt-1 h-4 w-4 shrink-0 appearance-none rounded-sm border-2 border-[#e0e0e0] bg-white checked:border-0 checked:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0 dark:border-slate-700 dark:bg-slate-900 dark:focus:ring-primary"
          {...register(name)}
        />
        <svg
          className="pointer-events-none absolute mt-1 hidden h-4 w-4 peer-checked:block"
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
      <div className="ms-2 text-sm">
        <label
          htmlFor="helper-checkbox"
          className="font-medium text-gray-900 dark:text-gray-300"
        >
          {title}
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
