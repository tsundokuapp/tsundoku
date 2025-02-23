// Color Checked
// Components Checked
import Link from 'next/link';

interface FooterLinkProps {
  text: string;
  action?: string;
}

export function FooterLink({ text, action = '/' }: FooterLinkProps) {
  return (
    <Link
      href={action}
      className="text-base font-bold uppercase text-appFooterText hover:underline hover:underline-offset-4 sm:text-lg md:text-xl"
    >
      {text}
    </Link>
  );
}
