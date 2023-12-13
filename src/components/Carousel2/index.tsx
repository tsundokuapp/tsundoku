// import elaina from "@/assets/img/carousel/elaina.jpeg";
// import goblins from "@/assets/img/carousel/goblins.jpeg";
// import mushoku from "@/assets/img/carousel/mushoku.jpeg";
// import parasita from "@/assets/img/carousel/parasita.jpeg";
// import tearmoon from "@/assets/img/carousel/Tearmoon.jpeg";

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
  src: string;
  alt: string;
  isActive: boolean;
  clickToActive?: () => void;
}

export const MagicAccordion = ({
  src,
  alt,
  isActive,
  clickToActive,
}: SliderImageProps) => {
  // const accordion = document.querySelector(".accordion");
  // accordion.addEventListener("click", (e) => { });

  // <SliderImage>
  //         <Image
  //           src={mushoku}
  //           alt="Banner da obra feita pela tsundoku 2"
  //           height={450}
  //         />
  //       </SliderImage>
  return (
    <SliderWrapper>
      <SliderAccordion>
        <SliderAccordionPanel isActive={isActive} onClick={clickToActive}>
          <h2 id="panel1-heading">
            <ButtonAccordionController
              className="accordion-trigger"
              aria-controls="panel1-content"
              aria-expanded="true"
            >
              <span id="panel1-title">Click me</span>
            </ButtonAccordionController>
          </h2>
          <SliderAccordionContent
            isActive={isActive}
            id="panel1-content"
            aria-labelledby="panel1-heading"
            aria-hidden="false"
            role="region"
          >
            <p>algo generico para exemplo</p>
            <ImageAccordion src={src} alt={alt} />
          </SliderAccordionContent>
        </SliderAccordionPanel>
      </SliderAccordion>
    </SliderWrapper>
  );
};
