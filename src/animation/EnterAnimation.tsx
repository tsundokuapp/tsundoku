// Color Checked
// Components Checked
import * as motion from 'motion/react-client';

import { cn } from '@/helpers/twUtils';

interface EnterAnimationProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delay?: number;
  initial: string | Record<string, number>;
  animate: string | Record<string, number>;
  exit: string | Record<string, number>;
  className?: string;
}

export const EnterAnimation = ({
  children,
  delay = 0.4,
  initial,
  animate,
  exit,
  className,
}: EnterAnimationProps) => {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      exit={exit}
      transition={{
        duration: delay,
      }}
      className={cn('', className)}
    >
      {children}
    </motion.div>
  );
};
