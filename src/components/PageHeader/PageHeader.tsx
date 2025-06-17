import "./PageHeader.scss";

import { LazyLoadImage } from "react-lazy-load-image-component";
import React from "react";
import SplitText from "../SplitText/SplitText";

type Props = {
  title: string;
  description: string;
  image?: {
    node: {
      mediaItemUrl: string;
      altText: string;
    };
  };
};

export default function PageHeader({ title, description, image }: Props) {
  return (
    <div className={`PageHeader mb-4 ${image ? "PageHeader--withImage" : ""}`}>
      <div>
        <SplitText
          textType="h1"
          text={title}
          className="display--1 mb-4"
          delay={20}
          animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
          animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
          easing="easeOutCubic"
          threshold={0.2}
          rootMargin="-50px"
        />

        <SplitText
          text={description}
          className="PageHeader__desc"
          delay={20}
          animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
          animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
          easing="easeOutCubic"
          threshold={0.2}
          rootMargin="-50px"
        />
      </div>
      {image && (
        <div>
          <LazyLoadImage
            src={image.node.mediaItemUrl}
            alt={image.node.altText}
            className="PageHeader__img"
          />
        </div>
      )}
    </div>
  );
}
