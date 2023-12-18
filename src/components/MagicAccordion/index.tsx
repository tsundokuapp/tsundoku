import { useState } from "react";

import {
  SliderWrapper,
  SliderAccordion,
  SliderAccordionPanel,
  SliderAccordionContent,
  ImageAccordion,
  AccordionTitle,
} from "./styles";

interface SliderImageProps {
  id: string;
  src: string;
  alt: string;
  isActive: boolean;
  title: string;
  description: string;
}

export const MagicAccordion = () => {
  const [accordionActive, setAccordionActive] = useState("ghi");
  // const [resetTimeout, setResetTimeout] = useState(false);

  const imageDefault = "https://i.imgur.com/9EYs9Nn.jpeg";
  const arrayAccordion: SliderImageProps[] = [
    {
      id: "mna",
      src: "https://i0.wp.com/tsundoku.com.br/wp-content/uploads/2022/01/parasita.jpg",
      alt: "Uma menina com fone de ouvido",
      isActive: false,
      title: "Parasita Apaixonado",
      description:
        "A historia é sobre um homem do qual suas tendências compulsivas o fazem virar um vagabundo, e uma garota que largou a escola e é apaixonada por insetos.",
    },
    {
      id: "abc",
      src: "https://i3.wp.com/tsundoku.com.br/wp-content/uploads/2023/11/edMT_V20_Capa.jpg",
      alt: "elaina",
      isActive: true,
      title: "Mushoku Tensei: Rencarnação do Desempregado",
      description: "algo generico para exemplo",
    },
    {
      id: "def",
      src: "https://i2.wp.com/tsundoku.com.br/wp-content/uploads/2023/03/MdG_V11_Capa.png",
      alt: "Goblins",
      isActive: false,
      title: "Matador de Goblins",
      description: "algo generico para exemplo",
    },
    {
      id: "ghi",
      src: "https://i0.wp.com/tsundoku.com.br/wp-content/uploads/2021/12/MJ_V8_Capa.jpg",
      alt: "Elaina",
      isActive: false,
      title: "Bruxa Errante: A Jornada de Elaina",
      description: "algo generico para exemplo",
    },
    {
      id: "jkl",
      src: "https://i0.wp.com/tsundoku.com.br/wp-content/uploads/2022/10/Shadow_V4_Capa.jpg",
      alt: "Dois jovens em uma tela escura",
      isActive: false,
      title: "A Eminência na Sombra",
      description: "algo generico para exemplo",
    },
    {
      id: "mno",
      src: "https://i0.wp.com/tsundoku.com.br/wp-content/uploads/2022/01/parasita.jpg",
      alt: "Uma menina com fone de ouvido",
      isActive: false,
      title: "Parasita Apaixonado",
      description:
        "A historia é sobre um homem do qual suas tendências compulsivas o fazem virar um vagabundo, e uma garota que largou a escola e é apaixonada por insetos.",
    },
    {
      id: "mnb",
      src: "https://i0.wp.com/tsundoku.com.br/wp-content/uploads/2022/01/parasita.jpg",
      alt: "Uma menina com fone de ouvido",
      isActive: false,
      title: "Parasita Apaixonado",
      description:
        "A historia é sobre um homem do qual suas tendências compulsivas o fazem virar um vagabundo, e uma garota que largou a escola e é apaixonada por insetos.",
    },
  ];

  // setTimeout(() => {
  //   const slideActive = arrayAccordion.findIndex(
  //     (item) => item.id === accordionActive,
  //   );
  //   const nextTarget = slideActive + 1;
  //   const nextSlideId = arrayAccordion[nextTarget]
  //     ? arrayAccordion[nextTarget].id
  //     : arrayAccordion[0].id;
  //   // if (resetTimeout) return setResetTimeout(false);
  //   nextSlider(nextSlideId);
  // }, 3000);

  const nextSlider = (id: string) => {
    // setResetTimeout(true);
    setAccordionActive(id);
  };

  return (
    <SliderWrapper>
      <SliderAccordion>
        {arrayAccordion.map((item) => (
          <SliderAccordionPanel
            key={item.id}
            isActive={item.id === accordionActive}
            onClick={() => nextSlider(item.id)}
          >
            <AccordionTitle id="panel1-title">{item.title}</AccordionTitle>
            <SliderAccordionContent
              isActive={item.id === accordionActive}
              id="panel1-content"
              aria-labelledby="panel1-heading"
              aria-hidden="false"
              role="region"
            >
              <p>{item.description}</p>
              <ImageAccordion src={item.src || imageDefault} alt={item.alt} />
            </SliderAccordionContent>
          </SliderAccordionPanel>
        ))}
      </SliderAccordion>
    </SliderWrapper>
  );
};
