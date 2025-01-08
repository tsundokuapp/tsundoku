import { type UseFormRegister } from 'react-hook-form';

export interface ICheckbox
  extends Omit<React.HTMLProps<HTMLInputElement>, 'size'> {
  label: string;
  description?: string;
  register: UseFormRegister<any>;
  name: string;
  size?: 'sm' | 'md' | 'lg';
}
