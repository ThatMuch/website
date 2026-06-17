import "./TestimonialCard.scss";

import { FaStar } from "react-icons/fa";
import React from "react";
import { sanitizeHtml } from "../../utils/sanitize";

type TestimonialCardProps = {
  testimonial: {
    title: string;
    testimonialContent: {
      nom: string;
      role: string;
      citation: string;
      stars: number;
    };
  };
};

export default function TestimonialCard({
  testimonial: { testimonialContent },
}: TestimonialCardProps) {
  const { nom, role, citation, stars } = testimonialContent;
  return (
    <div className="TestimonialCard">
      <div className="tmw-tcard__stars">
        {Array.from({ length: stars }, (_, index) => (
          <FaStar key={index} color="#FDB900" />
        ))}
      </div>
      <p
        className="tmw-tcard__quote"
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(citation) }}
      />
      <div className="tmw-tcard__by">
        <span className="tmw-tcard__initials">
          {nom[0]}
          {nom[1]}
        </span>
        <div>
          <div className="tmw-tcard__name">{nom}</div>
          <div className="tmw-tcard__role">{role}</div>
        </div>
      </div>
    </div>
  );
}
