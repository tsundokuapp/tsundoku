import { ErrorMessage } from '@hookform/error-message';
import { useEffect } from 'react';
import {
  type FieldErrors,
  type Path,
  type PathValue,
  type UseFormGetValues,
  type UseFormWatch,
} from 'react-hook-form';

import type { IGenres } from '@/@types/Api';
import { DropdownContainer } from '@/components/common/dropdown/DropdownContainer';
import { DropdownOption } from '@/components/common/dropdown/DropdownOption';
import { merge } from '@/helpers/twUtils';

interface FormMultiSelectProps<T extends Record<string, unknown>> {
  label: string;
  name: Path<T>;
  watch: UseFormWatch<T>;
  getValues: UseFormGetValues<T>;
  onClick: (key: keyof T, item: T[keyof T]) => void;
  errors: FieldErrors;
  options: string[];
  className?: string;
  defaultValue?: IGenres[];
}

export const FormMultiSelect = <T extends Record<string, unknown>>({
  label,
  name,
  watch,
  getValues,
  onClick,
  errors,
  options,
  className,
  defaultValue,
}: FormMultiSelectProps<T>) => {
  useEffect(() => {
    if (defaultValue) {
      defaultValue.forEach((item) => {
        onClick(name, item.descricao as T[keyof T]);
      });
    }
  }, [defaultValue]); // eslint-disable-line react-hooks/exhaustive-deps

  function ItemsSelected() {
    return (
      <div className="flex flex-wrap gap-2">
        {(watch(name) as unknown as string[]).map(
          (item: string, index: number) => (
            <span
              key={index}
              className="rounded-md bg-gray-200 px-2 py-1 text-xs text-black dark:bg-gray-700 dark:text-white"
            >
              {item}
            </span>
          ),
        )}
      </div>
    );
  }

  const isSelected = (item: PathValue<T, Path<T>>) => {
    const values = getValues(name);

    const arrayValues = Array.isArray(values) ? values : [values];

    return arrayValues.includes(item);
  };

  return (
    <section>
      <label
        htmlFor={label}
        className="mb-1 block text-base font-normal text-gray-800 dark:text-white"
      >
        {label}
      </label>

      <DropdownContainer
        className={(merge('w-[280px]'), className)}
        label={label}
        value={watch(name) ? <ItemsSelected /> : 'Selecione'}
      >
        {options.map((item, index) => (
          <DropdownOption
            key={index}
            label={item}
            onClick={() => onClick(name, item as T[keyof T])}
            value={item}
            selected={isSelected(item as PathValue<T, Path<T>>)}
          />
        ))}
      </DropdownContainer>
      <p className="mt-1 text-xs text-red-400">
        <ErrorMessage errors={errors} name={name} />
      </p>
    </section>
  );
};
