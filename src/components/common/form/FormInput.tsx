import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { cn } from '@/helpers/twUtils';

interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  errors: FieldErrors;
  register: UseFormRegister<any>;
  className?: string;
  name: string;
}

export const FormInput = ({
  className,
  label,
  name,
  type = 'text',
  placeholder,
  errors,
  register,
  ...props
}: InputProps) => {
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
          'w-full rounded-md border border-[#e0e0e0] bg-white px-3 py-2 text-base font-medium text-black outline-none focus:border-primary focus:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:text-white',
          className,
        )}
        {...register(name)}
        {...props}
      />
      <p className="mt-1 text-xs text-red-400">
        <ErrorMessage errors={errors} name={name} />
      </p>
    </div>
  );
};
