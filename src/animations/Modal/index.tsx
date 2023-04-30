import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

const dropInAnimation = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

interface IModalProps {
  children: React.ReactNode;
  content: string;
}

export const Modal = ({ children, content }: IModalProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  return (
    <div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="save-button"
        onClick={() => (modalOpen ? close() : open())}
      >
        {children}
      </motion.button>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            onClick={() => close()}
            className="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="modal orange-gradient"
              variants={dropInAnimation}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {content}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
