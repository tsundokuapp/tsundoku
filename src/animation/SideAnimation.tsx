import * as motion from 'motion/react-client';

import { cn } from '@/helpers/twUtils';

interface SideAnimationProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const SideAnimation = ({
  children,
  delay = 0.3,
  className,
}: SideAnimationProps) => {
  return (
    <motion.div
      initial={{ opacity: 1, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 1, x: 300 }}
      transition={{ duration: delay, type: 'easeInOut' }}
      className={cn('', className)}
    >
      {children}
    </motion.div>
  );
};
