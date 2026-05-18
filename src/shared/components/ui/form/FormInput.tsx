import { ErrorMessage } from '@hookform/error-message';
import { Eye, EyeClosed } from '@phosphor-icons/react/dist/ssr';
import { useEffect, useRef, useState } from 'react';
import {
  type FieldErrors,
  type Path,
  type PathValue,
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
        className="text-authText mb-1 block text-base font-normal"
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
            'border-authInputBorder bg-authInputBackground text-authInputText focus:border-authInputFocus placeholder:text-authInputPlaceholder w-full rounded-md border px-3 py-2 text-base font-medium outline-none transition-colors focus:shadow-md disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          min={type === 'number' ? min : undefined}
          disabled={disabled}
          {...register(name)}
          {...props}
        />
        {isPassword && (
          <button
            className="text-authInputIcon hover:text-authInputText absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md outline-none transition-colors focus:z-10 focus-visible:ring-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
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
