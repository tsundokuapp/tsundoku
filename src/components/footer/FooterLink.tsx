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
        'text-gray-800 font-bold text-xl uppercase hover:underline hover:underline-offset-8'
      }
    >
      {text}
    </Link>
  );
}
