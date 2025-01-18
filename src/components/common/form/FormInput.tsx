import { ErrorMessage } from '@hookform/error-message';
import React, { useEffect } from 'react';
import {
  type Path,
  type PathValue,
  type FieldErrors,
  type UseFormRegister,
  type UseFormSetValue,
} from 'react-hook-form';

import { cn } from '@/helpers/twUtils';

interface InputProps<T extends Record<string, unknown>> {
  label: string;
  type?: string;
  placeholder?: string;
  errors: FieldErrors;
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  className?: string;
  name: Path<T>;
  min?: number;
  disabled?: boolean;
  defaultValue?: PathValue<T, Path<T>>;
}

export const FormInput = <T extends Record<string, unknown>>({
  className,
  label,
  name,
  type = 'text',
  placeholder,
  errors,
  register,
  min = 1,
  disabled,
  setValue,
  defaultValue,
  ...props
}: InputProps<T>) => {
  useEffect(() => {
    if (defaultValue) {
      setValue(name, defaultValue);
    }
  }, [defaultValue]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col">
      <label
        htmlFor={label}
        className="mb-1 block text-base font-normal text-gray-800 dark:text-white"
      >
        {label}
      </label>
      <input
        type={type}
        id={`input-${name}`}
        placeholder={placeholder}
        className={cn(
          'w-full rounded-md border border-[#e0e0e0] bg-white px-3 py-2 text-base font-medium text-black outline-none focus:border-primary focus:shadow-md disabled:cursor-not-allowed dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-primary disabled:dark:opacity-50',
          className,
        )}
        min={type === 'number' ? min : undefined}
        disabled={disabled}
        {...register(name)}
        {...props}
      />
      <p className="mt-1 text-xs text-red-400">
        <ErrorMessage errors={errors} name={name} />
      </p>
    </div>
  );
};
