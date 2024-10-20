import Link from 'next/link';

export const LogoLink = () => {
  return (
    <Link
      className="flex items-center gap-2 text-2xl font-extrabold text-white"
      href="/"
    >
      <span className="text-sky-600">/</span>
      Tsundoku
      <span className="text-sky-600">/</span>
    </Link>
  );
};
