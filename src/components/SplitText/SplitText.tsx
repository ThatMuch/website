import React, { MutableRefObject, useEffect, useRef, useState, useMemo } from "react";
import { animated, useSprings } from "@react-spring/web";

interface SplitTextProps {
  text?: string;
  className?: string;
  delay?: number;
  animationFrom?: { opacity: number; transform: string };
  animationTo?: { opacity: number; transform: string };
  easing?: (t: number) => number;
  threshold?: number;
  rootMargin?: string;
  textAlign?: React.CSSProperties["textAlign"];
  onLetterAnimationComplete?: () => void;
  textType?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
}

const SplitText: React.FC<SplitTextProps> = ({
  text = "",
  className = "",
  delay = 100,
  animationFrom = { opacity: 0, transform: "translate3d(0,40px,0)" },
  animationTo = { opacity: 1, transform: "translate3d(0,0,0)" },
  easing = (t: number) => t,
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "left",
  onLetterAnimationComplete,
  textType = "p",
}) => {
  const words = useMemo(() => text.split(" ").map((word) => word.split("")), [text]);
  const letters = useMemo(() => words.flat(), [words]);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const animatedCount = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const springs = useSprings(
    letters.length,
    useMemo(() => letters.map((_, i) => ({
      from: animationFrom,
      to: inView
        ? async (next: (props: object) => Promise<void>) => {
            await next(animationTo);
            animatedCount.current += 1;
            if (
              animatedCount.current === letters.length &&
              onLetterAnimationComplete
            ) {
              onLetterAnimationComplete();
            }
          }
        : animationFrom,
      delay: i * delay,
      config: { easing },
    })), [letters, inView, animationFrom, animationTo, delay, easing, onLetterAnimationComplete])
  );

  const renderAnimation = words.map((word, wordIndex) => (
    <span
      key={wordIndex}
      style={{ display: "inline-block", whiteSpace: "nowrap" }}
    >
      {word.map((letter, letterIndex) => {
        const index =
          words.slice(0, wordIndex).reduce((acc, w) => acc + w.length, 0) +
          letterIndex;

        return (
          <animated.span
            key={index}
            style={{
              ...springs[index],
              display: "inline-block",
              willChange: "transform, opacity",
            }}
          >
            {letter}
          </animated.span>
        );
      })}
      <span style={{ display: "inline-block", width: "0.3em" }}>&nbsp;</span>
    </span>
  ));

  const textProps = {
    ref: ref,
    className: `split-parent ${className}`,
    style: {
      textAlign,
      overflow: "hidden",

      whiteSpace: "normal",
      wordWrap: "break-word",
    } as React.CSSProperties,
  };

  const renderText = () => {
    switch (textType) {
      case "h1":
        return <h1 {...textProps}>{renderAnimation}</h1>;
      case "h2":
        return <h2 {...textProps}>{renderAnimation}</h2>;
      case "h3":
        return <h3 {...textProps}>{renderAnimation}</h3>;
      case "h4":
        return <h4 {...textProps}>{renderAnimation}</h4>;
      case "h5":
        return <h5 {...textProps}>{renderAnimation}</h5>;
      case "h6":
        return <h6 {...textProps}>{renderAnimation}</h6>;
      case "p":
      default:
        return <p {...textProps}>{renderAnimation}</p>;
    }
  };

  return (
    // display the text as a heading or paragraph based on the textType prop
    <>{renderText()}</>
  );
};

export default SplitText;
