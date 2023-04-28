import { motion } from "framer-motion";
import React from "react";

interface IItenByItemAnimationProps {
  children: React.ReactNode;
  order: number;
}

const variant = {
  initial: { x: 0, opacity: 0 },
  animate: { x: 0, opacity: 1 },
};

export const ItemByItemAnimation = ({
  children,
  order,
}: IItenByItemAnimationProps) => {
  return (
    <motion.div
      variants={variant}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.3, delay: order * 0.5 }}
    >
      {children}
    </motion.div>
  );
};

const variantHorizontal = {
  initial: { x: "-100vw", opacity: 0 },
  animate: { x: 0, opacity: 1 },
};

export const ItemByItemHorizontalAnimation = ({
  children,
  order,
}: IItenByItemAnimationProps) => {
  return (
    <motion.div
      variants={variantHorizontal}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.3, delay: order * 0.5 }}
    >
      {children}
    </motion.div>
  );
};
