import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { cn } from '@/helpers/twUtils';

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  placeholder?: string;
  errors: FieldErrors;
  register: UseFormRegister<any>;
  className?: string;
  name: string;
  cols?: number;
  rows?: number;
}

export const FormTextArea = ({
  className,
  label,
  name,
  placeholder,
  errors,
  register,
  cols = 50,
  rows = 10,
  ...props
}: TextAreaProps) => {
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
        className={cn(
          'w-full rounded-md border border-[#e0e0e0] bg-white px-3 py-2 text-base font-medium text-white outline-none focus:border-primary focus:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:focus:border-primary',
          className,
        )}
        cols={cols}
        rows={rows}
        {...register(name)}
        {...props}
      />
      <p className="mt-1 text-xs text-red-400">
        <ErrorMessage errors={errors} name={name} />
      </p>
    </div>
  );
};
