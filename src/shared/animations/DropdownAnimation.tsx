// Color Checked
// Components Checked

import * as motion from 'motion/react-client';

type MotionDivProps = React.ComponentProps<typeof motion.div>;

interface DropdownAnimationProps
  extends Omit<MotionDivProps, 'initial' | 'animate' | 'exit'> {
  children: React.ReactNode;
  duration?: number;
  direction: 'up' | 'down';
  triggerHeight: number;
  className?: string;
}

export const DropdownAnimation = ({
  children,
  duration = 0.3,
  direction,
  triggerHeight,
  className,
  ...props
}: DropdownAnimationProps) => {
  const animationInitial =
    direction === 'down'
      ? { opacity: 0, y: 0 }
      : { opacity: 0, y: -triggerHeight };
  const animationAnimate =
    direction === 'down'
      ? { opacity: 1, y: 8 }
      : { opacity: 1, y: -triggerHeight - 8 };
  const animationExit = animationInitial;

  return (
    <motion.div
      initial={animationInitial}
      animate={animationAnimate}
      exit={animationExit}
      transition={{ duration }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
