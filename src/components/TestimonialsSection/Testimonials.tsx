import "./Testimonials.scss";

import EmblaCarousel from "../EmblaCarousel/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import React from "react";
import TestimonialCard from "./TestimonialCard";
import { useSiteCustomPosts } from "../../hooks/use-custom-testimonial";

type Props = {
  title: string;
  description: string;
  subtitle: string;
};

export default function Testimonials({ title, description, subtitle }: Props) {
  const OPTIONS: EmblaOptionsType = { slidesToScroll: "auto" };
  const data = useSiteCustomPosts();
  const wpTestimonials = data.allWpTestimonial?.edges ?? [];
  const googleReviews = data.allGoogleReview?.edges ?? [];

  // transform WordPress testimonials to a common shape, shared with Google reviews
  const transformedWpTestimonials = wpTestimonials.map(({ node }) => {
    const { title, testimonialContent } = node;
    const { nom, role, citation, stars } = testimonialContent;
    return {
      id: title,
      source: "wordpress" as const,
      testimonialContent: {
        nom,
        role,
        citation,
        stars,
      },
    };
  });

  // transform Google reviews to the same shape as WordPress testimonials
  const transformedGoogleReviews = googleReviews.map(({ node }) => {
    const { id, authorName, text, rating } = node;
    return {
      id,
      source: "google" as const,
      testimonialContent: {
        nom: authorName,
        role: "Avis Google",
        citation: text,
        stars: rating,
      },
    };
  });

  const testimonials = [...transformedWpTestimonials, ...transformedGoogleReviews];
  const SLIDE_COUNT = testimonials.length;

  return (
    <div className="Testimonials">
      <div className="Testimonials__header section__header">
        <h2 className="h3">{subtitle}</h2>
        <div className="divider mb-4"></div>
        <h2>{title}</h2>
      </div>
      <EmblaCarousel
        options={OPTIONS}
        slidesToScroll={SLIDE_COUNT}
        showDots={false}
      >
        {testimonials.map((testimonial) => (
          <div className="embla__slide" key={testimonial.id}>
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
      </EmblaCarousel>
    </div>
  );
}
