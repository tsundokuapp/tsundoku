import { ErrorMessage } from '@hookform/error-message';
import { Eye, EyeClosed } from '@phosphor-icons/react/dist/ssr';
import React, { useEffect, useRef, useState } from 'react';
import {
  type Path,
  type PathValue,
  type FieldErrors,
  type UseFormRegister,
  type UseFormSetValue,
} from 'react-hook-form';

import { cn } from '@/shared/utils/cn';

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
  isPassword?: boolean;
}

export const FormInput = <T extends Record<string, unknown>>({
  className,
  isPassword = false,
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
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const hasSetDefault = useRef(false);

  useEffect(() => {
    if (!defaultValue || hasSetDefault.current) return;

    setValue(name, defaultValue);
    hasSetDefault.current = true;
  }, [defaultValue]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex w-full max-w-sm flex-col">
      <label
        className="mb-1 block text-base font-normal text-appText"
        htmlFor={`input-${name}`}
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={isPassword ? (isVisible ? 'text' : 'password') : type}
          id={`input-${name}`}
          placeholder={placeholder}
          className={cn(
            'focus:border-primary dark:bg-appPrimary dark:focus:border-primary w-full rounded-md border border-[#e0e0e0] bg-appSearchBackground px-3 py-2 text-base font-medium text-appSearchText outline-none focus:shadow-md disabled:cursor-not-allowed dark:border-slate-700 disabled:dark:opacity-50',
            className,
          )}
          min={type === 'number' ? min : undefined}
          disabled={disabled}
          {...register(name)}
          {...props}
        />
        {isPassword && (
          <button
            className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md outline-none transition-[color,box-shadow] focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            onClick={toggleVisibility}
            aria-label={isVisible ? 'Hide password' : 'Show password'}
            aria-pressed={isVisible}
            aria-controls="password"
          >
            {isVisible ? (
              <EyeClosed size={16} aria-hidden="true" />
            ) : (
              <Eye size={16} aria-hidden="true" />
            )}
          </button>
        )}
      </div>
      <p className="mt-1 text-xs text-red-400">
        <ErrorMessage errors={errors} name={name} />
      </p>
    </div>
  );
};
