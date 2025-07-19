import Link from 'next/link';

export default function EditorPage() {
  return (
    <div className="flex flex-col gap-8 sm:gap-12">
      <h1 className="text-2xl font-bold">Editor Page</h1>
      <p>
        {' '}
        click{' '}
        <Link href="/editor/12345" className="text-blue-500 hover:underline">
          {' '}
          here
        </Link>
      </p>
    </div>
  );
}
