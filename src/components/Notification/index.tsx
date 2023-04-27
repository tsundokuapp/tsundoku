import React from "react";
import {
  Base,
  Main,
  Title,
  Description,
  Footer,
  Button,
  ButtonClose,
  Header,
  Progress,
  IconBox,
} from "./styles";
import { BiCheckSquare } from "react-icons/bi";
import { RiCloseFill, RiErrorWarningLine } from "react-icons/ri";

function getType(notificationType: string) {
  const opacity = 0.7;
  if (notificationType === "error") {
    return {
      Icon: RiErrorWarningLine,
      iconColor: "##FF0000",
      bodyColor: `rgba(255, 0, 0, ${opacity})`,
    };
  }

  if (notificationType === "success") {
    return {
      Icon: RiErrorWarningLine,
      iconColor: "##2BE51A",
      bodyColor: `rgba(43, 229, 26, ${opacity})`,
    };
  }

  if (notificationType === "warning") {
    return {
      Icon: RiErrorWarningLine,
      iconColor: "#FF8000",
      bodyColor: `rgba(255, 128, 0, ${opacity})`,
    };
  }

  return {
    Icon: BiCheckSquare,
    iconColor: "#259CC1",
    bodyColor: `rgba(37, 156, 193, ${opacity})`,
  };
}

interface INotificationProps {
  title: string;
  description: string;
  type: "success" | "error" | "warning" | "info";
  onClose: () => void;
  onMore?: () => void;
  timePercent: number;
}

export const Notification = ({
  title,
  description,
  type,
  onClose,
  onMore,
}: INotificationProps) => {
  const { Icon, iconColor, bodyColor } = getType(type);

  return (
    <Base
      initial={{ opacity: 0, scale: 0.8, x: 300 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.8, x: 300 }}
      transition={{
        type: "spring",
        bounce: 0.25,
      }}
      layout // Reposition after another notification is removed
    >
      <Progress progress={0} />
      <IconBox>
        <Icon size={32} style={{ color: iconColor }} />
      </IconBox>
      <Main bodyColor={bodyColor}>
        <Header>
          <Title>{title}</Title>
          <ButtonClose onClick={onClose}>
            <RiCloseFill />
          </ButtonClose>
        </Header>
        <Description>{description}</Description>
        <Footer>{onMore && <Button onClick={onMore}>Mais...</Button>}</Footer>
      </Main>
    </Base>
  );
};
