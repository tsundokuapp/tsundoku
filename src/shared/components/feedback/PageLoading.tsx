'use client';
import { Loader2 } from 'lucide-react';
import * as motion from 'motion/react-client';

function PageLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: [0, 0.5, 1],
          scale: 1,
          transition: {
            duration: 0.8,
            scale: {
              type: 'spring',
              stiffness: 50,
              damping: 15,
              delay: 0.2,
            },
            opacity: {
              duration: 0.6,
              times: [0, 0.6, 1],
            },
          },
        }}
        exit={{
          opacity: 0,
          scale: 0.95,
          transition: {
            duration: 0.4,
            ease: 'easeOut',
          },
        }}
      >
        <Loader2 className="h-10 w-10 animate-spin text-gray-400" />
      </motion.div>
    </div>
  );
}

export default PageLoading;
