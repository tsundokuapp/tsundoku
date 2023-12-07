import styled, { css } from "styled-components";

export const SliderContainer = styled.main`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;

  width: 100%;
  height: 450px;
  border-radius: "0.5rem";
  background-color: red;

  overflow: hidden;
`;

interface IActive {
  active?: boolean;
}

const isActive = (active?: boolean) =>
  active
    ? css`
        aspect-ratio: 9/12;
        filter: brightness(1);
        cursor: pointer;
      `
    : css`
        aspect-ratio: 5/12;
        overflow: hidden;
        filter: brightness(0.5);
      `;

export const SliderImage = styled.div<IActive>`
  position: relative;
  height: 100%;

  aspect-ratio: 5/12;
  filter: brightness(0.5);

  transition: all 0.3s;
  :hover {
    ${({ active }) => isActive(true)};
  }
`;
