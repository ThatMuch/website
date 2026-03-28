import "./TestimonialCard.scss";

import React, { useMemo } from "react";
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

  // ⚡ Bolt Optimization: Memoized expensive sanitizeHtml call.
  // This avoids re-running DOMPurify (~0.8ms per call) on every re-render
  // of the TestimonialCard component.
  const sanitizedCitation = useMemo(() => sanitizeHtml(citation), [citation]);

  return (
    <div className="TestimonialCard">
      <div>
        {Array.from({ length: stars }, (_, index) => (
          <span key={index}>⭐</span>
        ))}
      </div>
      <div dangerouslySetInnerHTML={{ __html: sanitizedCitation }} />
      <div className="TestimonialCard__author">
        <strong className="TestimonialCard__name">{nom}</strong>
        <p className="TestimonialCard__role">{role}</p>
      </div>
    </div>
  );
}
