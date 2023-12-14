// import elaina from "@/assets/img/carousel/elaina.jpeg";
// import goblins from "@/assets/img/carousel/goblins.jpeg";
// import mushoku from "@/assets/img/carousel/mushoku.jpeg";
// import parasita from "@/assets/img/carousel/parasita.jpeg";
// import tearmoon from "@/assets/img/carousel/Tearmoon.jpeg";

import { useState } from "react";

import {
  SliderWrapper,
  SliderAccordion,
  SliderAccordionPanel,
  SliderAccordionContent,
  ButtonAccordionController,
  ImageAccordion,
} from "./styles";

// const imageDefault = "https://i.imgur.com/9EYs9Nn.jpeg";
interface SliderImageProps {
  id: number;
  src: string;
  alt: string;
  isActive: boolean;
  title: string;
  description: string;
  // clickToActive?: () => void;
}

export const MagicAccordion = () => {
  const [accordionActive, setAccordionActive] = useState(1);

  const arrayAccordion: SliderImageProps[] = [
    {
      id: 0,
      src: "https://i.imgur.com/9EYs9Nn.jpeg",
      alt: "elaina",
      isActive: true,
      title: "Elaina",
      description: "algo generico para exemplo",
    },
    {
      id: 1,
      src: "https://i.imgur.com/ZabdhjT.jpeg",
      alt: "elaina",
      isActive: false,
      title: "Bruxa",
      description: "algo generico para exemplo",
    },
    {
      id: 2,
      src: "https://i.imgur.com/9EYs9Nn.jpeg",
      alt: "elaina",
      isActive: false,
      title: "Errante",
      description: "algo generico para exemplo",
    },
  ];

  const clickToActive = (id: number) => {
    setAccordionActive(id);
  };

  return (
    <SliderWrapper>
      <SliderAccordion>
        {arrayAccordion.map((item) => (
          <SliderAccordionPanel
            key={item.id}
            isActive={item.id === accordionActive}
            onClick={() => clickToActive(item.id)}
          >
            <h2 id="panel1-heading">
              <ButtonAccordionController
                className="accordion-trigger"
                aria-controls="panel1-content"
                aria-expanded="true"
              >
                <span id="panel1-title">{item.title}</span>
              </ButtonAccordionController>
            </h2>
            <SliderAccordionContent
              isActive={item.id === accordionActive}
              id="panel1-content"
              aria-labelledby="panel1-heading"
              aria-hidden="false"
              role="region"
            >
              <p>{item.description}</p>
              <ImageAccordion src={item.src} alt={item.alt} />
            </SliderAccordionContent>
          </SliderAccordionPanel>
        ))}
      </SliderAccordion>
    </SliderWrapper>
  );
};
