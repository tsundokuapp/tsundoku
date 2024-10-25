import { CaretDown, CaretUp } from '@phosphor-icons/react/dist/ssr';
import React, { useState } from 'react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

export function Accordion({ title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleAccordionToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex w-full flex-col rounded-lg bg-slate-200 dark:bg-slate-950">
      <div
        className="flex h-6 cursor-pointer flex-row items-center justify-between rounded-lg px-6 py-8 hover:bg-slate-300 dark:hover:bg-slate-800"
        onClick={handleAccordionToggle}
      >
        <span className="font-bold uppercase">{title}</span>
        <span>{isOpen ? <CaretUp size={24} /> : <CaretDown size={24} />}</span>
      </div>

      {isOpen && <div className="px-6 py-4">{children}</div>}
    </div>
  );
}
