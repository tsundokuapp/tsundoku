import Image from "next/image";

import elaina from "@/assets/img/carousel/elaina.jpeg";
import goblins from "@/assets/img/carousel/goblins.jpeg";
import mushoku from "@/assets/img/carousel/mushoku.jpeg";
import parasita from "@/assets/img/carousel/parasita.jpeg";
import tearmoon from "@/assets/img/carousel/Tearmoon.jpeg";

import { SliderImage, SliderContainer } from "./styles";

// TODO: as imagens devem ter tamanho de 1056x300px, adicionar isso na documentação

export const Demo = () => {
  // const [sliderRef] = useKeenSlider<HTMLDivElement>(
  //   {
  //     loop: true,
  //   },
  //   [
  //     (slider) => {
  //       let timeout: ReturnType<typeof setTimeout>;
  //       let mouseOver = false;
  //       function clearNextTimeout() {
  //         clearTimeout(timeout);
  //       }
  //       function nextTimeout() {
  //         clearTimeout(timeout);
  //         if (mouseOver) return;
  //         timeout = setTimeout(() => {
  //           slider.next();
  //         }, 2000);
  //       }
  //       slider.on("created", () => {
  //         slider.container.addEventListener("mouseover", () => {
  //           mouseOver = true;
  //           clearNextTimeout();
  //         });
  //         slider.container.addEventListener("mouseout", () => {
  //           mouseOver = false;
  //           nextTimeout();
  //         });
  //         nextTimeout();
  //       });
  //       slider.on("dragStarted", clearNextTimeout);
  //       slider.on("animationEnded", nextTimeout);
  //       slider.on("updated", nextTimeout);
  //     },
  //   ],
  // );

  return (
    <>
      <SliderContainer>
        <SliderImage>
          <Image
            src={elaina}
            alt="Banner da obra feita pela tsundoku 0"
            fill={true}
          />
        </SliderImage>
        <SliderImage>
          <Image
            src={goblins}
            alt="Banner da obra feita pela tsundoku 1"
            fill={true}
          />
        </SliderImage>
        <SliderImage>
          <Image
            src={parasita}
            alt="Banner da obra feita pela tsundoku 2"
            fill={true}
          />
        </SliderImage>
        <SliderImage>
          <Image
            src={tearmoon}
            alt="Banner da obra feita pela tsundoku 2"
            fill={true}
          />
        </SliderImage>
        <SliderImage>
          <Image
            src={mushoku}
            alt="Banner da obra feita pela tsundoku 2"
            fill={true}
          />
        </SliderImage>
      </SliderContainer>
    </>
  );
};
