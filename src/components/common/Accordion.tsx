import { CaretUp } from '@phosphor-icons/react/dist/ssr';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';
import React, { useRef, useState } from 'react';

import { cn } from '@/helpers/twUtils';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  classNameItems?: string;
}

export function Accordion({ title, children, className, classNameItems }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleAccordionToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={cn(
        'flex w-full flex-col rounded-lg bg-slate-200 dark:bg-slate-950',
        className,
      )}
    >
      <div
        className={cn("flex h-6 cursor-pointer flex-row items-center justify-between rounded-lg px-6 py-8 hover:bg-slate-300 dark:hover:bg-slate-800", classNameItems)}
        onClick={handleAccordionToggle}
      >
        <span className="font-bold uppercase">{title}</span>
        <span>
          <CaretUp
            size={24}
            className={`${isOpen ? 'rotate-180' : ''} transition duration-300 ease-in-out`}
          />
        </span>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0 }}
            animate={{
              height: contentRef.current
                ? contentRef.current.scrollHeight
                : 'auto',
            }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div ref={contentRef} className="px-6 py-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
