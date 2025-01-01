import { ErrorMessage } from '@hookform/error-message';
import { FieldErrors, UseFormGetValues, UseFormWatch } from 'react-hook-form';

import { DropdownContainer } from '@/components/common/dropdown/DropdownContainer';
import { DropdownOption } from '@/components/common/dropdown/DropdownOption';
import { InputFormProject } from '@/helpers/Schemas';
interface FormDropdownProps<T extends Record<string, unknown>> {
  label: string;
  name: string;
  watch: UseFormWatch<any>;
  getValues: UseFormGetValues<any>;
  onClick: (key: keyof T, item: T[keyof T]) => void;
  errors: FieldErrors;
  options: string[];
}

export const FormDropdown = ({
  label,
  name,
  watch,
  getValues,
  onClick,
  errors,
  options,
}: FormDropdownProps<InputFormProject>) => {
  return (
    <section>
      <label
        htmlFor="Status"
        className="mb-1 block text-base font-normal text-gray-800 dark:text-white"
      >
        {label}
      </label>

      <DropdownContainer
        label={label}
        value={watch(name) ? getValues(name) : 'Selecione'}
      >
        {options.map((item, index) => (
          <DropdownOption
            key={index}
            label={item}
            onClick={() => onClick(name as keyof InputFormProject, item)}
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
