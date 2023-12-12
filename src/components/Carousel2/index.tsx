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

export const Demo = () => {
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
        <SliderAccordionPanel>
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
            id="panel1-content"
            aria-labelledby="panel1-heading"
            aria-hidden="false"
            role="region"
          >
            <p>algo generico para exemplo</p>
            <img
              className="accordion-image"
              src="assets/img/carousel/elaina.jpeg"
              alt="Uma garota sentada"
            />
          </SliderAccordionContent>
        </SliderAccordionPanel>

        <SliderAccordionPanel>
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
            id="panel1-content"
            aria-labelledby="panel1-heading"
            aria-hidden="false"
            role="region"
          >
            <p>algo generico para exemplo</p>
            <ImageAccordion
              className="accordion-image"
              src="assets/img/carousel/elaina.jpeg"
              alt="Uma garota sentada"
            />
          </SliderAccordionContent>
        </SliderAccordionPanel>
      </SliderAccordion>
    </SliderWrapper>
  );
};
