import * as React from "react";
import { SliderImage } from "./styles";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";

import majoA from "@/assets/img/carousel/majoA.png";
import majoB from "@/assets/img/carousel/majoB.png";
import majoC from "@/assets/img/carousel/majoC.png";

// TODO: as imagens devem ter tamanho de 1056x300px, adicionar isso na documentação

export const Carousel = () => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ],
  );

  return (
    <>
      <div
        style={{ borderRadius: "0.5rem" }}
        ref={sliderRef}
        className="keen-slider"
      >
        <SliderImage className="keen-slider__slide number-slide1">
          <Image
            src={majoA}
            alt="Banner da obra feita pela tsundoku 0"
            fill={true}
            priority={true}
          />
        </SliderImage>
        <SliderImage className="keen-slider__slide number-slide2">
          <Image
            src={majoB}
            alt="Banner da obra feita pela tsundoku 1"
            fill={true}
            priority={true}
          />
        </SliderImage>
        <SliderImage className="keen-slider__slide number-slide3">
          <Image
            src={majoC}
            alt="Banner da obra feita pela tsundoku 2"
            fill={true}
            priority={true}
          />
        </SliderImage>
      </div>
    </>
  );
};
