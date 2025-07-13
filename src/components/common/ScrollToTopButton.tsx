'use client';
// Color Checked
// Components Checked
import { CaretDoubleUp } from '@phosphor-icons/react/dist/ssr';
import { useEffect, useState } from 'react';

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkScrollPoint = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', checkScrollPoint);

    return () => {
      window.removeEventListener('scroll', checkScrollPoint);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    isVisible && (
      <button
        onClick={handleScrollToTop}
        className="fixed bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-appButtonBackground p-3 text-appButtonIcon shadow-lg transition-opacity duration-300 hover:bg-gradient-to-b hover:from-appButtonBackground hover:to-appButtonHover"
      >
        <CaretDoubleUp size={24} />
      </button>
    )
  );
}
