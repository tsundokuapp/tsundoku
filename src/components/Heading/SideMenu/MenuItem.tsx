import * as React from "react";
import { IconPlaceholder, TextPlaceholder, Li } from "./styles";
import Link from "next/link";
import { ILinksProps } from "@/constants/ListLink";
import { useModal } from "@/Context/ContextModal";
import { useRouter } from "next/router";

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

interface IMenuItemProps extends ILinksProps {
  i: number;
}

export const MenuItem = ({ href, label, i }: IMenuItemProps) => {
  const { closeModal } = useModal();

  const router = useRouter();
  const activePath = router.pathname === href;

  const style = { border: `2px solid ${colors[i]}` };
  return (
    <Li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      style={{
        background: activePath ? "#259CC1" : "transparent",
        fontWeight: activePath ? "bold" : "normal",
      }}
    >
      <Link
        href={href}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "90%",
        }}
        onClick={() => closeModal()}
      >
        <IconPlaceholder style={style}></IconPlaceholder>
        <TextPlaceholder>{label}</TextPlaceholder>
      </Link>
    </Li>
  );
};
