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
  max-width: 55rem;
  width: 100%;
  margin-inline: auto;
  padding-inline: 1rem;
`;

export const SliderAccordion = styled.div`
  --_button-size: 3rem;
  --_panel-padding: 0.75rem;
  --_panel-gap: 0.25rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--_panel-gap);
  margin: 0;

  @media (min-width: 45em) {
    flex-direction: row;
    height: 30rem;
  }
`;

interface SliderAccordionPanelProps {
  isActive: boolean;
}

export const SliderAccordionPanel = styled.div<SliderAccordionPanelProps>`
  position: relative;
  isolation: isolate;
  width: 100%;
  flex-basis: calc((var(--_panel-padding) * 4) + var(--_button-size));
  border-radius: 0;
  overflow: hidden;
  padding: var(--_panel-padding);
  padding-right: calc(var(--_panel-padding) * 4);
  cursor: pointer;

  ${({ isActive }) =>
    isActive &&
    `
    flex-basis:clamp(15rem, 40vw, 20rem);
    height: 100%;
    //flex-grow: 1;
      img { filter: brightness(0.6);
        @media (prefers-reduced-motion: no-preference) {
          transition: filter 0.5s ease-in-out;
        };
      }
    h2 { transform: rotate(0deg); opacity: 1; white-space: normal;}
    `}

  :hover {
    box-shadow: rgba(255, 255, 255, 0.25) 0px 4px 8px -2px;
  }

  @media (prefers-reduced-motion: no-preference) {
    transition: flex-basis 0.5s ease-in-out, flex-grow 0.5s ease-in-out;
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
`;

export const AccordionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: white;

  margin-left: var(--_panel-gap);
  position: relative;
  isolation: isolate;
  white-space: nowrap;
  flex-wrap: nowrap;
  align-items: center;
  transform: rotate(90deg);
  transform-origin: center left;
  opacity: 0;

  transition: all 0.5s ease-in-out;

  @media (max-width: 44.999em) {
  }
`;

export const SliderAccordionContent = styled.div<SliderAccordionPanelProps>`
  p {
    transform: translateY(2rem);
    opacity: 0;
    margin-left: var(--_panel-gap);

    ${({ isActive }) =>
      isActive &&
      `transform: translateY(0); opacity: 1; @media (prefers-reduced-motion: no-preference) { transition: transform 0.5s 0.5s, opacity 0.5s 0.5s;}`}
  }
`;
