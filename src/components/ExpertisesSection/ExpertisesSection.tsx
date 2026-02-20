import "./ExpertisesSection.scss";

import { LazyLoadImage } from "react-lazy-load-image-component";
import React from "react";
import { usePostExpertises } from "../../hooks/use-custom-expertises";
import { sanitizeHtml } from "../../utils/sanitize";

type Props = {
  section: {
    title: string;
    subtitle: string;
  };
};

interface Expertise {
  title: string
  category: string
  slug: string
  desc: string
  link_label: string
  featuredImage: {
    mediaItemUrl: string
    altText: string
  }
}

export default function ExpertisesSection({ section }: Props) {
  const expertises = usePostExpertises();
  return (
    <div className="ExpertisesSection">
      <div className="section__header">
        <h2 className="h3">{section.subtitle}</h2>
        <div className="divider mb-4"></div>
        <h2>{section.title}</h2>
      </div>
      <div className="ExpertisesSection__content">
        {expertises.map((expertise: Expertise) => (
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
              <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(expertise.desc) }} />
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
