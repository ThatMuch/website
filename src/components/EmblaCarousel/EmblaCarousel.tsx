import "./EmblaCarousel.scss";

import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";

import { EmblaOptionsType } from "embla-carousel";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
  children?: React.ReactNode;
  showDots?: boolean;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options, children, showDots } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const count = React.Children.count(children);

  return (
    <section
      className="embla"
      aria-roledescription="carousel"
      aria-label="Carousel"
    >
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {React.Children.map(children, (child, index) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as React.ReactElement, {
                role: "group",
                "aria-roledescription": "slide",
                "aria-label": `${index + 1} sur ${count}`,
              });
            }
            return child;
          })}
        </div>
      </div>

      <div className={`embla__controls ${showDots ? "show-dots" : ""}`}>
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        {showDots && (
          <div className="embla__dots">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={"embla__dot".concat(
                  index === selectedIndex ? " embla__dot--selected" : ""
                )}
                aria-label={`Aller à la diapositive ${index + 1}`}
                aria-pressed={index === selectedIndex}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default EmblaCarousel;
