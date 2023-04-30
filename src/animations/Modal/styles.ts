import styled from "styled-components";
import { motion } from "framer-motion";

export const ImageButton = styled(motion.img)`
  width: 400px;
  height: 100%;
  position: relative;
  cursor: pointer;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.quina.media};
`;

export const ModalView = styled(motion.div)`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: flex-start;

  img {
    height: 100%;
    object-fit: contain;
  }
`;
