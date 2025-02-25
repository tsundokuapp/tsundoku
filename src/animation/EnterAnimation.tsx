// Color Checked
// Components Checked
import * as motion from 'motion/react-client';

import { merge } from '@/helpers/twUtils';

interface EnterAnimationProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const EnterAnimation = ({
  children,
  delay = 0.4,
  className,
}: EnterAnimationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        duration: delay,
      }}
      className={merge('', className)}
    >
      {children}
    </motion.div>
  );
};
