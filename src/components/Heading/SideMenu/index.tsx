import React, { useRef } from "react";

import { useDimensions } from "@/hooks/useWindowDimensions";
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./Navigation";
import { Background, Nav } from "./styles";
import { useModal } from "@/Context/ContextModal";

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

export const SideMenuMobile = () => {
  const { closeModal, modalOpen } = useModal();

  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <Nav
      initial={false}
      animate={modalOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
      isVisible={modalOpen}
    >
      <Background variants={sidebar} isVisible={modalOpen} />
      <Navigation />
      <MenuToggle toggle={() => closeModal()} isVisible={modalOpen} />
    </Nav>
  );
};
