// Color Checked
import type { ReactNode, ComponentProps } from 'react';

interface BannerProps extends ComponentProps<'div'> {
  children?: ReactNode;
}

export function Banner({ children, ...props }: BannerProps) {
  return <div {...props}>{children}</div>;
}
