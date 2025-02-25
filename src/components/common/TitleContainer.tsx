// Color Checked
// Component Checked
import type { ComponentProps, ReactNode } from 'react';
import { merge } from '@/helpers/twUtils';

interface TitleContainerProps extends ComponentProps<'div'> {
  children?: ReactNode;
}
export function TitleContainer({
  children,
  className,
  ...props
}: TitleContainerProps) {
  return (
    <div
      className={merge('flex flex-1 flex-row justify-between', className)}
      {...props}
    >
      {children}
    </div>
  );
}
