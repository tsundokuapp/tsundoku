import * as React from "react";
import { IconPlaceholder, TextPlaceholder, Li } from "./styles";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

interface IMenuItemProps {
  i: number;
}

export const MenuItem = ({ i }: IMenuItemProps) => {
  const style = { border: `2px solid ${colors[i]}` };
  return (
    <Li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <IconPlaceholder style={style} />
      <TextPlaceholder style={style} />
    </Li>
  );
};
