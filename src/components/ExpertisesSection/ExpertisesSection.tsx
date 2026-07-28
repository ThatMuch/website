import "./ExpertisesSection.scss";

import Button from "../UI/Button/Button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import React from "react";
import { sanitizeHtml } from "../../utils/sanitize";
import { usePostExpertises } from "../../hooks/use-custom-expertises";

type Props = {
  section: {
    title: string;
    subtitle: string;
  };
};

interface Expertise {
  title: string;
  category: string;
  slug: string;
  desc: string;
  link_label: string;
  featuredImage?: {
    mediaItemUrl: string;
    altText: string;
  };
  descriptionExpertise: {
    titre: string;
    description: string;
    icon?: string;
  };
}

export default function ExpertisesSection({ section }: Props) {
  const expertises = usePostExpertises();
  console.log(expertises);
  return (
    <div className="ExpertisesSection">
      <div className="section__header">
        <p className="kicker">{section.subtitle}</p>
        <div className="divider mb-4" aria-hidden="true"></div>
        <h2>{section.title}</h2>
      </div>
      <div className="ExpertisesSection__content">
        {expertises.slice(0, 4).map((expertise: Expertise) => (
          <div
            className={`ExpertisesSection__card ${expertise.category}`}
            key={expertise.title}
          >
            <div>
              <div className="flex">
                <div
                  className="ExpertisesSection__card-icon"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(expertise.descriptionExpertise?.icon),
                  }}
                />
                <h3>{expertise.descriptionExpertise?.titre}</h3>
              </div>
              <div
                className="ExpertisesSection__card-desc"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(expertise.desc),
                }}
              />
            </div>
            <Button
              type="link"
              label={expertise.link_label}
              target="_self"
              className={`btn-link btn-light`}
              url={`/expertise/${expertise.slug}`}
            >
              {expertise.link_label}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
