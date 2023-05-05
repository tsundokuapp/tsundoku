import * as React from "react";
import { MenuItem } from "./MenuItem";
import { Ul } from "./styles";
import { defaultTabs } from "@/constants/ListLink";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export const Navigation = () => (
  <Ul variants={variants}>
    {defaultTabs.map((item, i) => (
      <MenuItem i={i} key={i} label={item.label} href={item.href} />
    ))}
  </Ul>
);
