import "./TestimonialCard.scss";

import { FaStar } from "react-icons/fa";
import React from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import googleIcon from "../../images/google-icon.svg";
import { sanitizeHtml } from "../../utils/sanitize";

type TestimonialCardProps = {
  testimonial: {
    source?: "wordpress" | "google";
    testimonialContent: {
      nom: string;
      role: string;
      citation: string;
      stars: number;
    };
  };
};

export default function TestimonialCard({
  testimonial: { source, testimonialContent },
}: TestimonialCardProps) {
  const { nom, role, citation, stars } = testimonialContent;
  return (
    <div className="TestimonialCard">
      {source === "google" && (
        <img
          className="tmw-tcard__google-icon"
          src={googleIcon}
          alt="Avis Google"
        />
      )}
      <div className="tmw-tcard__stars">
        {Array.from({ length: stars }, (_, index) => (
          <FaStar key={index} color="#FDB900" />
        ))}
        {source === "google" && <RiVerifiedBadgeFill color="#4789F4" />}
      </div>
      <div
        className="tmw-tcard__quote no-animation"
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
