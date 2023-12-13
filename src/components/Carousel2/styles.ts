import styled from "styled-components";

export const ImageAccordion = styled.img`
  display: block;
  position: absolute;

  max-width: 100%;
  height: 100%;
  width: 100%;

  inset: 0;
  object-fit: cover;
  z-index: -1;
`;

export const SliderWrapper = styled.div`
  max-width: 50rem;
  width: 100%;
  margin-inline: auto;
  padding-inline: 1rem;
`;

export const SliderAccordion = styled.div`
  --_button-size: 3rem;
  --_panel-padding: 0.75rem;
  --_panel-gap: 1rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0;
`;

interface SliderAccordionPanelProps {
  isActive: boolean;
}

export const SliderAccordionPanel = styled.div<SliderAccordionPanelProps>`
  position: relative;
  isolation: isolate;
  width: 100%;
  flex-basis: calc((var(--_panel-padding) * 2) + var(--_button-size));
  border-radius: calc(((var(--_panel-padding) * 2) + var(--_button-size)) / 2);
  overflow: hidden;
  padding: var(--_panel-padding);
  padding-right: calc(var(--_panel-padding) * 4);
  cursor: pointer;

  ${({ isActive }) =>
    isActive &&
    `flex-basis:clamp(15rem, 40vw, 20rem);
      img { filter: brightness(0.6);
        @media (prefers-reduced-motion: no-preference) {
          transition: filter 0.5s ease-in-out;
        };
      }
  `}

  :hover {
    box-shadow: rgba(255, 255, 255, 0.25) 0px 4px 8px -2px;
  }

  @media (prefers-reduced-motion: no-preference) {
    transition: flex-basis 0.5s ease-in-out;
  }
`;

export const ButtonAccordionController = styled.button`
  display: flex;
  align-items: center;
  gap: var(--_panel-gap);
  flex-direction: row-reverse;
  background: transparent;
  border: 0;
  padding: 0;
  color: red;

  span {
    font-size: 1.25rem;
    font-weight: 700;
  }
`;

export const SliderAccordionContent = styled.div<SliderAccordionPanelProps>`
  p {
    transform: translateY(2rem);
    opacity: 0;
    margin-left: varr(--_panel-gap);

    ${({ isActive }) => isActive && `transform: translateY(0); opacity: 1;`}

    @media (prefers-reduced-motion: no-preference) {
      transition: transform 0.5s 0.25s, opacity 0.5s 0.25s;
    }
  }
`;
