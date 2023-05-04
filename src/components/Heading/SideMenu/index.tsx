import React, { useEffect, useRef } from "react";
import { useCycle } from "framer-motion";

import { useDimensions } from "@/hooks/useWindowDimensions";
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./Navigation";
import { Background, Nav } from "./styles";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

interface ISideMenuMobileProps {
  externalController: boolean;
}

export const SideMenuMobile = ({
  externalController,
}: ISideMenuMobileProps) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  useEffect(() => {
    if (externalController !== isOpen) {
      toggleOpen();
    }
  }, [externalController, isOpen, toggleOpen]);

  return (
    <Nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
    >
      <Background variants={sidebar} isVisible={isOpen} />
      <Navigation />
      <MenuToggle toggle={() => toggleOpen()} />
    </Nav>
  );
};
