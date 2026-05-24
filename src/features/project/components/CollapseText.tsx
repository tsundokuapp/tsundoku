'use client';

import { useState, type ComponentProps } from 'react';

interface CollapseTextProps extends ComponentProps<'p'> {
  maxCharacter?: number;
  children: React.ReactNode;
}

export function CollapseText({
  maxCharacter = 0,
  children,
}: CollapseTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {maxCharacter === 0 ? (
        <p className="text-justify indent-4">{children}</p>
      ) : (
        <p>
          {isExpanded
            ? children
            : `${(children ?? '').toString().slice(0, maxCharacter)}...`}
          <span
            className="cursor-pointerx px-2 font-semibold hover:underline"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? '[Leia Menos]' : '[Leia Mais]'}
          </span>
        </p>
      )}
    </>
  );
}
