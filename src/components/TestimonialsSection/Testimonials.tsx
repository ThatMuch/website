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
  // transform testimonials to an array of objects with the same structure as the one used in the TestimonialCard component
  const transformedTestimonials = testimonials?.map(({ node }) => {
    const { title, testimonialContent } = node;
    const { nom, role, citation, stars } = testimonialContent;
    return {
      title,
      testimonialContent: {
        nom,
        role,
        citation,
        stars,
      },
    };
  });
  return (
    <div className="Testimonials">
      <div className="Testimonials__header">
        <h3>{subtitle}</h3>
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
