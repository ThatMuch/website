import "./ExpertisesSection.scss";

import { LazyLoadImage } from "react-lazy-load-image-component";
import React from "react";
import ScrollFloat from "../ScrollFloat/ScrollFloat";
import { usePostExpertises } from "../../hooks/use-custom-expertises";

type Props = {
  section: {
    title: string;
    subtitle: string;
  };
};

export default function ExpertisesSection({ section }: Props) {
  const expertises = usePostExpertises();
  return (
    <div className="ExpertisesSection">
      <div className="section__header">
        <h2 className="h3">{section.subtitle}</h2>
        <div className="divider mb-4"></div>
        <ScrollFloat
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="center bottom+=50%"
          scrollEnd="bottom bottom-=40%"
          stagger={0.03}
          containerClassName="h2"
        >
          {section.title}
        </ScrollFloat>
      </div>
      <div className="ExpertisesSection__content">
        {expertises.map((expertise) => (
          <div
            className={`ExpertisesSection__card ${expertise.category}`}
            key={expertise.title}
          >
            <div>
              <div className="ExpertisesSection__card-image">
                <LazyLoadImage
                  src={expertise.featuredImage.mediaItemUrl}
                  alt={expertise.featuredImage.altText}
                  effect="blur"
                />
              </div>
              <h3 className="h2">{expertise.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: expertise.desc }} />
            </div>

            <a
              href={`/expertise/${expertise.slug}`}
              className={`btn btn-${expertise.category}`}
            >
              {expertise.link_label}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
