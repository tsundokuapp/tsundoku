import { ErrorMessage } from '@hookform/error-message';
import { useEffect } from 'react';
import {
  type FieldErrors,
  type UseFormGetValues,
  type UseFormSetValue,
  type UseFormWatch,
  type Path,
  type PathValue,
} from 'react-hook-form';

import { DropdownContainer } from '@/components/common/dropdown/DropdownContainer';
import { DropdownOption } from '@/components/common/dropdown/DropdownOption';
interface FormDropdownProps<T extends Record<string, unknown>> {
  label: string;
  name: Path<T>;
  watch: UseFormWatch<T>;
  getValues: UseFormGetValues<T>;
  setValue: UseFormSetValue<T>;
  onClick: (key: keyof T, item: T[keyof T]) => void;
  errors: FieldErrors;
  options: string[];
  defaultValue?: PathValue<T, Path<T>>;
}

export const FormDropdown = <T extends Record<string, unknown>>({
  label,
  name,
  watch,
  getValues,
  onClick,
  errors,
  options,
  setValue,
  defaultValue,
}: FormDropdownProps<T>) => {
  useEffect(() => {
    if (defaultValue) {
      setValue(name, defaultValue);
    }
  }, [defaultValue]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section>
      <label
        htmlFor="Status"
        className="mb-1 block text-base font-normal text-appText"
      >
        {label}
      </label>

      <DropdownContainer
        label={label}
        value={watch(name) ? String(getValues(name)) : 'Selecione'}
      >
        {options.map((item, index) => (
          <DropdownOption
            key={index}
            label={item}
            onClick={() => onClick(name, item as T[keyof T])}
            value={item}
            selected={item === getValues(name)}
          />
        ))}
      </DropdownContainer>
      <p className="mt-1 text-xs text-red-400">
        <ErrorMessage errors={errors} name={name} />
      </p>
    </section>
  );
};
