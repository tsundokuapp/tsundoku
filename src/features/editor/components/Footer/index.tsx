'use client';

import { CounterWords } from './CounterWords';

export const Footer = () => {
  return (
    <footer className="sticky bottom-0 flex w-full items-center justify-between border-t bg-appGroupBackground px-4 py-2 text-center text-sm text-appSubtitle print:hidden">
      <p>Tsundoku</p>
      <CounterWords />
      <p>Tsundoku</p>
    </footer>
  );
};
