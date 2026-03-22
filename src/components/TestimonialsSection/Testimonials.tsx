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
  const testimonials = data.allWpTestimonial?.edges;
  const SLIDE_COUNT = testimonials?.length;

  // ⚡ Bolt Optimization: Removed `transformedTestimonials`.
  // The `transformedTestimonials` array was being calculated on every render
  // but was never actually used in the component (it mapped over `testimonials` directly).
  // Removing it eliminates wasted computation, reducing the render time.

  return (
    <div className="Testimonials">
      <div className="Testimonials__header section__header">
        <h2 className="h3">{subtitle}</h2>
        <div className="divider mb-4"></div>
          <h2>{title}</h2>
        <div dangerouslySetInnerHTML={{ __html: description }}></div>
      </div>
      <EmblaCarousel
        options={OPTIONS}
        slidesToScroll={SLIDE_COUNT}
        showDots={false}
      >
        {testimonials.map(({ node: testimonial }, index) => (
          <div className="embla__slide" key={index}>
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          </div>
        ))}
      </EmblaCarousel>
    </div>
  );
}
