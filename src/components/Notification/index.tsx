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

function getIcon(notificationType: string) {
  if (notificationType === "error") {
    return {
      Icon: RiErrorWarningLine,
      iconColor: "hsl(360,64%,55%)",
    };
  }

  if (notificationType === "warning") {
    return {
      Icon: RiErrorWarningLine,
      iconColor: "hsl(44,92%,63%)",
    };
  }

  return {
    Icon: BiCheckSquare,
    iconColor: "hsl(122, 40%, 52%)",
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
  timePercent,
}: INotificationProps) => {
  const { Icon, iconColor } = getIcon(type);

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
      <Progress progress={timePercent} />
      <IconBox>
        <Icon size={32} style={{ color: iconColor }} />
        <div>{timePercent}</div>
      </IconBox>
      <Main>
        <Header>
          <Title>{title}</Title>
          <ButtonClose onClick={onClose}>
            <RiCloseFill />
          </ButtonClose>
        </Header>
        <Description>
          {description} com texto maior pra ver até onde vai
        </Description>
        <Footer>{onMore && <Button onClick={onMore}>Mais...</Button>}</Footer>
      </Main>
    </Base>
  );
};
