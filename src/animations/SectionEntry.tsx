import React from "react";
import { motion } from "framer-motion";

interface ISectionEntryAnimationProps {
  children: React.ReactNode;
  time?: number;
  delay?: boolean;
}

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 20 },
};

const variantsLeft = {
  hidden: { opacity: 0, x: 20, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 20, y: 0 },
};

const variantsRight = {
  hidden: { opacity: 0, x: -20, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: -20, y: 0 },
};

export const SectionEntryAnimation = ({
  children,
  time = 0.5,
  delay = false,
}: ISectionEntryAnimationProps) => {
  if (delay) time += 0.5;

  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ duration: time, type: "easeInOut" }}
      style={{ position: "relative" }}
    >
      {children}
    </motion.div>
  );
};

export const SectionEntryAnimationLeft = ({
  children,
  time = 0.5,
  delay = false,
}: ISectionEntryAnimationProps) => {
  if (delay) time += 0.5;
  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variantsLeft}
      transition={{ duration: time, type: "easeInOut" }}
      style={{ position: "relative" }}
    >
      {children}
    </motion.div>
  );
};

export const SectionEntryAnimationRight = ({
  children,
  time = 0.5,
  delay = false,
}: ISectionEntryAnimationProps) => {
  if (delay) time += 0.5;

  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variantsRight}
      transition={{ duration: time, type: "easeInOut" }}
      style={{ position: "relative" }}
    >
      {children}
    </motion.div>
  );
};

/*
  <AnimatePresence mode="wait">
    <motion.div
      key={selectedTab ? selectedTab.label : "empty"}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {selectedTab ? selectedTab.icon : "😋"}
    </motion.div>
  </AnimatePresence>
*/
