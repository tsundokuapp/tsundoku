import { WebappShellV21 } from '@/shared/components/layout/v21/WebappShellV21';

export default function WebappLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <WebappShellV21>{children}</WebappShellV21>;
}
