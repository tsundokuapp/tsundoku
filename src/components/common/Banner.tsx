import type { ReactNode } from 'react';

interface BannerProps {
  className?: string;
  children?: ReactNode;
}

export function Banner({ children, ...props }: BannerProps) {
  return <div {...props}>{children}</div>;
}
