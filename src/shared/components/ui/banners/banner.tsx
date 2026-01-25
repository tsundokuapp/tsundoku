import type { ReactNode, ComponentProps } from 'react';

interface BannerProps extends ComponentProps<'div'> {
  children?: ReactNode;
}
// TODO: Existe dois banner, verificar o porque e gerar um componente base que substitua os dois

export function Banner({ children, ...props }: BannerProps) {
  return <div {...props}>{children}</div>;
}
