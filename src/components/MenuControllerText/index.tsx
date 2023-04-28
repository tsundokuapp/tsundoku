import { useState } from "react";
import { RiSoundModuleFill, RiCloseFill } from "react-icons/ri";
import { MenuStyled, MotionDiv, MotionDivChild, MotionButton } from "./styles";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

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
            >
              A
            </MotionButton>
            <MotionButton
              whileTap={{ scale: scaleButton }}
              transition={{ type: "spring", stiffness: 700, damping: 30 }}
            >
              B
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
