import { useState } from "react";
import { RiSoundModuleFill, RiCloseFill } from "react-icons/ri";
import { MenuStyled, MotionDiv, MotionDivChild, MotionButton } from "./styles";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useTheme } from "@/hooks/useThemeContext";
import { useNotify } from "@/Context/NotificationProvider";
interface IMenuControllerTextProps {
  fontMinus: () => void;
  fontPlus: () => void;
  lineMinus: () => void;
  linePlus: () => void;
}

export const MenuControllerText = ({
  fontMinus,
  fontPlus,
  lineMinus,
  linePlus,
}: IMenuControllerTextProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { activeDarkTheme, activeLightTheme, theme } = useTheme();

  const notify = useNotify();

  function ChangeTheme(targetTheme: string) {
    if (targetTheme === "light") {
      if (theme.name === "light") {
        notify({
          title: "Tema Ativo",
          description: "O tema light já está ativo",
          type: "info",
        });
      }
      activeLightTheme();
    }
    if (targetTheme === "dark") {
      if (theme.name === "default") {
        notify({
          title: "Tema Ativo",
          description: "O tema dark já está ativo",
          type: "info",
        });
      }
      activeDarkTheme();
    }
  }

  const scaleButton = 0.8;

  const Menu = () => {
    return (
      <MenuStyled>
        <ul>
          <strong>FONTE</strong>
          <li>
            <MotionButton
              whileTap={{ scale: scaleButton }}
              transition={{ type: "spring", stiffness: 700, damping: 30 }}
              onClick={fontMinus}
            >
              -
            </MotionButton>
            <MotionButton
              whileTap={{ scale: scaleButton }}
              transition={{ type: "spring", stiffness: 700, damping: 30 }}
              onClick={fontPlus}
            >
              +
            </MotionButton>
          </li>
        </ul>

        <ul>
          <strong>ENTRELINHA</strong>
          <li>
            <MotionButton
              whileTap={{ scale: scaleButton }}
              transition={{ type: "spring", stiffness: 700, damping: 30 }}
              onClick={lineMinus}
            >
              -
            </MotionButton>
            <MotionButton
              whileTap={{ scale: scaleButton }}
              transition={{ type: "spring", stiffness: 700, damping: 30 }}
              onClick={linePlus}
            >
              +
            </MotionButton>
          </li>
        </ul>

        <ul>
          <strong>TEMA</strong>
          <li>
            <MotionButton
              whileTap={{ scale: scaleButton }}
              transition={{ type: "spring", stiffness: 700, damping: 30 }}
              onClick={() => ChangeTheme("light")}
            >
              <>{theme.icon.lightIcon}</>
            </MotionButton>
            <MotionButton
              whileTap={{ scale: scaleButton }}
              transition={{ type: "spring", stiffness: 700, damping: 30 }}
              onClick={() => ChangeTheme("dark")}
            >
              <>{theme.icon.darkIcon}</>
            </MotionButton>
          </li>
        </ul>

        <ul>
          <strong>CAPÍTULO</strong>
          <li>
            <MotionButton
              whileTap={{ scale: scaleButton }}
              transition={{ type: "spring", stiffness: 700, damping: 30 }}
            >
              <FaChevronLeft />
            </MotionButton>
            <MotionButton
              whileTap={{ scale: scaleButton }}
              transition={{ type: "spring", stiffness: 700, damping: 30 }}
            >
              <FaChevronRight />
            </MotionButton>
          </li>
        </ul>
      </MenuStyled>
    );
  };

  return (
    <MotionDiv layout dataIsOpen={isOpen}>
      <MotionDivChild layout onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <RiCloseFill /> : <RiSoundModuleFill />}
      </MotionDivChild>
      {isOpen && <Menu />}
    </MotionDiv>
  );
};
