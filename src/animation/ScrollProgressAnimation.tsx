'use client';

import { motion, useScroll } from 'motion/react';
import { ReactElement } from 'react';

interface ScrollProgressAnimationProps {
  children: React.ReactNode | ReactElement;
  onTop?: boolean;
  onBottom?: boolean;
}

export default function ScrollProgressAnimation({
  children,
  onTop,
  onBottom,
}: ScrollProgressAnimationProps) {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <motion.div
        id="scroll-indicator"
        style={{
          scaleX: scrollYProgress,
          position: 'fixed',
          bottom: `${onBottom ? '0' : ''}`,
          top: `${onTop ? '0' : ''}`,
          left: 0,
          right: 0,
          height: 5,
          originX: 0,
          zIndex: 100,
          backgroundColor: '#0284C7',
        }}
      />
      {children}
    </>
  );
}
