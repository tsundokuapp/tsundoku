import { ErrorMessage } from '@hookform/error-message';
import { FieldErrors, UseFormGetValues, UseFormWatch } from 'react-hook-form';

import { DropdownContainer } from '@/components/common/dropdown/DropdownContainer';
import { DropdownOption } from '@/components/common/dropdown/DropdownOption';
import { InputFormProject } from '@/helpers/Schemas';
import { cn } from '@/helpers/twUtils';

interface FormMultiSelectProps<T extends Record<string, unknown>> {
  label: string;
  name: string;
  watch: UseFormWatch<any>;
  getValues: UseFormGetValues<any>;
  onClick: (key: keyof T, item: T[keyof T]) => void;
  errors: FieldErrors;
  options: string[];
  className?: string;
}

export const FormMultiSelect = ({
  label,
  name,
  watch,
  getValues,
  onClick,
  errors,
  options,
  className,
}: FormMultiSelectProps<InputFormProject>) => {
  function ItemsSelected() {
    return (
      <div className="flex flex-wrap gap-2">
        {watch(name).map((item: string, index: number) => (
          <span
            key={index}
            className="rounded-md bg-gray-200 px-2 py-1 text-xs text-black dark:bg-gray-700 dark:text-white"
          >
            {item}
          </span>
        ))}
      </div>
    );
  }

  const isSelected = (item: string) => {
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
        className={(cn('w-[280px]'), className)}
        label={label}
        value={watch(name) ? <ItemsSelected /> : 'Selecione'}
      >
        {options.map((item, index) => (
          <DropdownOption
            key={index}
            label={item}
            onClick={() => onClick(name as keyof InputFormProject, item)}
            value={item}
            selected={isSelected(item)}
          />
        ))}
      </DropdownContainer>
      <p className="mt-1 text-xs text-red-400">
        <ErrorMessage errors={errors} name={name} />
      </p>
    </section>
  );
};
