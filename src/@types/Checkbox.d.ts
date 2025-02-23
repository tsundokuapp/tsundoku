import { type UseFormRegister } from 'react-hook-form';

export interface ICheckbox extends Omit<React.Props<Checkbox>, 'size'> {
  label: string;
  description?: string;
  register: UseFormRegister<any>;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  id?: string;
}
