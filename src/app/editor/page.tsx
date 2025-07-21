'use client';

import { useQuery } from 'convex/react';
import Link from 'next/link';

import { api } from '../../../convex/_generated/api';

export default function EditorPage() {
  const documents = useQuery(api.documents.getDocuments);

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
        {documents?.map((doc) => (
          <div key={doc._id} className="flex flex-col gap-2 text-lg">
            <p>{doc.title}</p>
          </div>
        ))}
      </p>
    </div>
  );
}
