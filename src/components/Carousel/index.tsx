import * as React from "react"
import { SliderImage } from  './styles'
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import Image from 'next/image'

import wpp1 from '../../assets/img/carousel/wpp1.jpg'
import wpp2 from '../../assets/img/carousel/wpp2.jpg'
import wpp3 from '../../assets/img/carousel/wpp3.jpg'

export const Carousel = () => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>
        let mouseOver = false
        function clearNextTimeout() {
          clearTimeout(timeout)
        }
        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 2000)
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on("dragStarted", clearNextTimeout)
        slider.on("animationEnded", nextTimeout)
        slider.on("updated", nextTimeout)
      },
    ]
  )

  return (
    <>
      <div ref={sliderRef} className="keen-slider">
        <SliderImage className="keen-slider__slide number-slide1">
            <Image src={wpp1} alt="exemplo1" fill={true}/>
        </SliderImage>
        <SliderImage className="keen-slider__slide number-slide2">
            <Image src={wpp2} alt="exemplo2" fill={true}/>
        </SliderImage>
        <SliderImage className="keen-slider__slide number-slide3">
            <Image src={wpp3} alt="exemplo3" fill={true}/>
        </SliderImage>
      </div>
    </>
  )
}
