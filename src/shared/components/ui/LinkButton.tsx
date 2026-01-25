import Link from 'next/link';

interface LinkButtonProps {
  className?: string;
  text: string;
  action?: string;
}

export function LinkButton({ text, action = '#', ...props }: LinkButtonProps) {
  return (
    <Link {...props} href={action}>
      {text}
    </Link>
  );
}
