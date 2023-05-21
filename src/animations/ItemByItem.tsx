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

const defaultDelay = 0.2;

export const ItemByItemAnimation = ({
  children,
  order,
}: IItenByItemAnimationProps) => {
  return (
    <motion.div
      variants={variant}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.3, delay: order * defaultDelay }}
    >
      {children}
    </motion.div>
  );
};

const variantRightHorizontal = {
  initial: { x: "-50vw", opacity: 0 },
  animate: { x: 0, opacity: 1 },
};

const variantLeftHorizontal = {
  initial: { x: "50vw", opacity: 0 },
  animate: { x: 0, opacity: 1 },
};

export const ItemByItemRightAnimation = ({
  children,
  order,
}: IItenByItemAnimationProps) => {
  return (
    <motion.div
      variants={variantRightHorizontal}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.3, delay: order * defaultDelay }}
    >
      {children}
    </motion.div>
  );
};

export const ItemByItemLeftAnimation = ({
  children,
  order,
}: IItenByItemAnimationProps) => {
  return (
    <motion.div
      variants={variantLeftHorizontal}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.3, delay: order * defaultDelay }}
    >
      {children}
    </motion.div>
  );
};
