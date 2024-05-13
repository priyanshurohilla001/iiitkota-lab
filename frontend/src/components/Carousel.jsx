import React from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import "../styles/embla.css";

export const Carousel = () => {
  const imageUrls = [
    "/iiit-kota-3-rd-convocation-1.636b92d7.webp",
    "/chairmanVisit.3de1f945.webp",
    "/iiit-kota-3-rd-convocation-2.4859118f.webp",
    "/independenceDay.6ea83eac.webp",
    "/SecondFrame.118a7df5.webp",
    "/YuvaSangam.f9dc2f96.webp",
  ];

  const OPTIONS = { loop: true };

  return (
    <div className="">
      <EmblaCarousel slides={imageUrls} options={OPTIONS} />
    </div>
  );
};

const EmblaCarousel = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <img
                src={`${index}`}
                className="w-auto min-h-96 min-w-96  object-cover transform-gpu"
                style={{ height: "100%" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
