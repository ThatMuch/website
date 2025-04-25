import "./ExpertisesSection.scss";

import React from "react";
import { usePostExpertises } from "../../hooks/use-custom-expertises";

type Props = {
  section: {
    title: string;
    subtitle: string;
  };
};

export default function ExpertisesSection({ section }: Props) {
  const expertises = usePostExpertises();
  console.log(expertises);
  return (
    <div className="ExpertisesSection">
      <h2 className="h3">{section.subtitle}</h2>
      <div className="divider mb-4"></div>
      <h3 className="h2 mb-5">{section.title}</h3>
      <div className="ExpertisesSection__content">
        {expertises.map((expertise) => (
          <div
            className={`ExpertisesSection__card ${expertise.category}`}
            key={expertise.title}
          >
            <div>
              <div className="ExpertisesSection__card-image">
                <img
                  src={expertise.featuredImage.mediaItemUrl}
                  alt={expertise.featuredImage.altText}
                />
              </div>
              <h2>{expertise.title}</h2>
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
