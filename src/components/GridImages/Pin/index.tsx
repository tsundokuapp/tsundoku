import { useEffect, useState } from "react";

import { AnimatePresence } from "framer-motion";

import {
  PinBox,
  ModalMember,
  ModalContent,
  BoxInfoStaff,
  BoxImageStaff,
} from "./styles";

interface IPinProps {
  size: "small" | "medium" | "large" | string;
  src: string;
  id: number;
  position: string;
  member: string;
  favorites: string[];
  bio: string;
}

export const Pin = ({
  size,
  src,
  id,
  position,
  member,
  favorites,
  bio,
}: IPinProps) => {
  const [selectedId, setSelectedId] = useState<string | null>();
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedId(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const idConvert = String(id);

  return (
    <AnimatePresence>
      <PinBox
        size={size}
        onClick={() => setSelectedId(idConvert)}
        data-testid="pin-box"
      >
        <img
          src={src}
          alt="Imagem de uma personagem de anime escolhido pelo membro da staff"
        />
        <div>
          <strong>{position}</strong>
          <strong>{member}</strong>
        </div>
      </PinBox>

      {selectedId && (
        <ModalMember
          onClick={() => setSelectedId(null)}
          data-testid="modal-member"
        >
          <ModalContent>
            <BoxImageStaff>
              <img
                src={src}
                alt="Imagem de uma personagem de anime escolhido pelo membro da staff"
              />
              <strong>{position}</strong>
              <strong>{member}</strong>
            </BoxImageStaff>
            <BoxInfoStaff>
              <strong>Obras Favoritas</strong>
              <p>{favorites}</p>
              <strong>Bio</strong>
              <p>{bio}</p>
            </BoxInfoStaff>
          </ModalContent>
        </ModalMember>
      )}
    </AnimatePresence>
  );
};
