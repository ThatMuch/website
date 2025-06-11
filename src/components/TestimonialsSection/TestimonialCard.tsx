import "./TestimonialCard.scss";

import React from "react";

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
      <div>
        {Array.from({ length: stars }, (_, index) => (
          <span key={index}>⭐</span>
        ))}
      </div>
      <div dangerouslySetInnerHTML={{ __html: citation }} />
      <div className="TestimonialCard__author">
        <strong className="TestimonialCard__name">{nom}</strong>
        <p className="TestimonialCard__role">{role}</p>
      </div>
    </div>
  );
}
