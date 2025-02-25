import { ErrorMessage } from '@hookform/error-message';
import React, { useEffect } from 'react';
import {
  Path,
  PathValue,
  type FieldErrors,
  type UseFormRegister,
  type UseFormSetValue,
} from 'react-hook-form';

import { merge } from '@/helpers/twUtils';

interface TextAreaProps<T extends Record<string, unknown>>
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  placeholder?: string;
  errors: FieldErrors;
  register: UseFormRegister<T>;
  className?: string;
  name: Path<T>;
  cols?: number;
  rows?: number;
  setValue: UseFormSetValue<T>;
  defaultValue?: string;
}

export const FormTextArea = <T extends Record<string, unknown>>({
  className,
  label,
  name,
  placeholder,
  errors,
  register,
  cols = 50,
  rows = 10,
  defaultValue,
  setValue,
  ...props
}: TextAreaProps<T>) => {
  useEffect(() => {
    if (defaultValue) {
      setValue(name, defaultValue as PathValue<T, Path<T>>);
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
      <textarea
        id={`textarea-${name}`}
        placeholder={placeholder}
        className={merge(
          'focus:border-primary dark:bg-appPrimary dark:focus:border-primary w-full rounded-md border border-[#e0e0e0] bg-white px-3 py-2 text-base font-medium text-white outline-none focus:shadow-md dark:border-slate-700',
          className,
        )}
        cols={cols}
        rows={rows}
        defaultValue={defaultValue}
        {...register(name)}
        {...props}
      />
      <p className="mt-1 text-xs text-red-400">
        <ErrorMessage errors={errors} name={name} />
      </p>
    </div>
  );
};
