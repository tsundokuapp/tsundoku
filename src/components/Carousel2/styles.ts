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
  margin-inline: auto;
  padding-inline: 1rem;
`;

export const SliderAccordion = styled.div`
  --_button-size: 3rem;
  --_panel-padding: 0.75rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  margin: 0;
`;

export const SliderAccordionPanel = styled.div`
  position: relative;
  isolation: isolate;
  flex-basis: calc(var((--_panel-padding) * 2) + var(--_button-size));
  overflow: hidden;
  padding: var(--_panel-padding);
`;
export const ButtonAccordionController = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-direction: row-reverse;
  background: transparent;
  border: 0;
  padding: 0;
`;
export const SliderAccordionContent = styled.div``;
