import Link from 'next/link';

interface FooterLinkProps {
  text: string;
  action?: string;
}

export function FooterLink({ text, action = '/' }: FooterLinkProps) {
  return (
    <Link
      href={action}
      className={
        'text-xl font-bold uppercase text-gray-800 hover:underline hover:underline-offset-8'
      }
    >
      {text}
    </Link>
  );
}
