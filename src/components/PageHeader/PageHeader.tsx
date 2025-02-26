import "./PageHeader.scss";

import React from "react";
import SplitText from "../SplitText/SplitText";

type Props = {
  title: string;
  description: string;
};

export default function PageHeader({ title, description }: Props) {
  return (
    <div className="PageHeader mb-4">
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
      {/* <p className="PageHeader__desc">{description}</p> */}
    </div>
  );
}
