import "./Testimonials.scss";

import EmblaCarousel from "../EmblaCarousel/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import React from "react";
import ScrollFloat from "../ScrollFloat/ScrollFloat";
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
      <div className="Testimonials__header section__header">
        <h2 className="h3">{subtitle}</h2>
        <div className="divider mb-4"></div>
        <ScrollFloat
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="center bottom+=50%"
          scrollEnd="bottom bottom-=40%"
          stagger={0.03}
          containerClassName="h2"
        >
          {title}
        </ScrollFloat>
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
