import Link from 'next/link';

interface HeaderLinkProps {
  text: string;
  action?: string;
  active?: boolean;
}

export function HeaderLink({
  text,
  action = '/',
  active,
  ...props
}: HeaderLinkProps) {
  return (
    <Link
      {...props}
      href={action}
      className={`text-white font-bold text-xl uppercase hover:underline hover:underline-offset-8 hover:decoration-sky-600 ${active ? 'underline underline-offset-8 decoration-sky-600' : ''}`}
    >
      {text}
    </Link>
  );
}
