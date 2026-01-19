import { ErrorMessage } from '@hookform/error-message';
import { useEffect, useRef } from 'react';
import {
  type Path,
  type UseFormSetValue,
  type FieldErrors,
  type PathValue,
  type UseFormGetValues,
  type UseFormWatch,
} from 'react-hook-form';

import { cn } from '@/helpers/twUtils';

import { MultiSelect } from '../select/MultiSelect';

interface FormMultiSelectProps<T extends Record<string, unknown>> {
  label: string;
  name: Path<T>;
  watch: UseFormWatch<T>;
  getValues: UseFormGetValues<T>;
  onClick: (items: T[keyof T]) => void;
  options: string[];
  className?: string;
  defaultValue?: PathValue<T, Path<T>>;
  errors: FieldErrors;
  placeholder?: string;
  setValue: UseFormSetValue<T>;
}

export const FormMultiSelect = <T extends Record<string, unknown>>({
  label,
  name,
  watch,
  onClick,
  getValues,
  errors,
  options,
  setValue,
  className,
  defaultValue,
  placeholder = 'Selecione...',
}: FormMultiSelectProps<T>) => {
  const hasSetDefault = useRef(false);

  useEffect(() => {
    if (!defaultValue || hasSetDefault.current) return;

    setValue(name, defaultValue);
    hasSetDefault.current = true;
  }, [defaultValue]); // eslint-disable-line react-hooks/exhaustive-deps

  const generateOptions = (items: string[]) => {
    return items.map((item) => ({ label: item, value: item }));
  };

  return (
    <div className={cn('w-[380px]', className)}>
      <label className="mb-1 block text-base font-normal text-appText">
        {label}
      </label>

      <MultiSelect
        options={generateOptions(options)}
        onValueChange={(itemsSelected) => onClick(itemsSelected as T[keyof T])}
        defaultValue={getValues(name) as unknown as string[]}
        placeholder={placeholder}
        value={watch(name) as unknown as string[]}
        aria-label={label}
      />
      <p className="mt-1 text-xs text-red-400">
        <ErrorMessage errors={errors} name={name} />
      </p>
    </div>
  );
};
