import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageButton, ModalView } from "./styles";
interface IItemProps {
  id: string;
  src: string;
  altImg: string;
  tipOn?: boolean;
}

export const ModalImage = ({ src, id, altImg, tipOn = true }: IItemProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div
      style={{
        textAlign: "center",
        margin: "1rem",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <ImageButton
        src={src}
        alt={altImg}
        onClick={() => setSelectedId(id)}
        layoutId={id}
      />
      {tipOn && <p>Clique para ampliar</p>}

      <AnimatePresence>
        {selectedId && (
          <ModalView layoutId={id} onClick={() => setSelectedId(null)}>
            <motion.img src={src} alt={altImg} />
          </ModalView>
        )}
      </AnimatePresence>
    </div>
  );
};
