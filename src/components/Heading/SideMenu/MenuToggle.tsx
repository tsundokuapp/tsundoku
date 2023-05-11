import * as React from "react";
import { SVGMotionProps, motion } from "framer-motion";
import { Button, Logo } from "./styles";
import Image from "next/image";
import logo from "@/assets/logo/logoDefault.svg";
import { SectionEntryAnimationRight } from "@/animations/SectionEntry";

interface IMenuToggleProps {
  toggle: () => void;
  isVisible: boolean;
}

interface IPathProps extends SVGMotionProps<SVGPathElement> {
  variants: {
    closed: { d?: string; opacity?: number; color?: string };
    open: { d?: string; opacity?: number; color?: string };
  };
}

const Path = (props: IPathProps) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="#fff"
    strokeLinecap="round"
    {...props}
  />
);

export const MenuToggle = ({ toggle, isVisible }: IMenuToggleProps) => {
  return (
    <Button onClick={toggle} isVisible={isVisible}>
      <SectionEntryAnimationRight>
        <Logo>
          <Image alt="Logo Tsundoku" src={logo} height="40" />
          <h3>Tsundoku</h3>
        </Logo>
      </SectionEntryAnimationRight>

      <svg width="23" height="23" viewBox="0 0 23 23">
        <Path
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" },
          }}
        />
      </svg>
    </Button>
  );
};
