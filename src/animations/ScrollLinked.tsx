import { motion, useScroll, useSpring } from "framer-motion";
import styles from "./scroll.module.css";

export const CircleIndicator = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div className={styles.progress} style={{ scaleX }} />
    </>
  );
};
