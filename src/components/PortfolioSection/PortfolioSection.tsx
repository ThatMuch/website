import "./PortfolioSection.scss";

import React, { Component } from "react";

import EmblaCarousel from "../EmblaCarousel/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";

type Props = {
  section: {
    title: string;
    sousTitre: string;
    description: string;
    project: {
      client: string;
      url: string;
      images: {
        node: {
          mediaItemUrl: string;
        };
      };
      title: string;
      description: string;
    }[];
  };
};

export default function PortfolioSection({ section }: Props) {
  const OPTIONS: EmblaOptionsType = {
    slidesToScroll: "auto",
    inViewThreshold: 1,
  };
  const SLIDE_COUNT = section?.project?.length;
  const { title, sousTitre } = section;

  return (
    <div className="PortfolioSection">
      <h2 className="h3">{title}</h2>
      <div className="divider mb-4"></div>
      <h3 className="h2 mb-5">{sousTitre}</h3>
      <div
        className="PortfolioSection__description"
        dangerouslySetInnerHTML={{ __html: section.description }}
      />

      <div className="overflow-hidden w-100 px-2">
        <EmblaCarousel
          options={OPTIONS}
          slidesToScroll={SLIDE_COUNT}
          showDots={false}
        >
          {section?.project?.map((project, index) => (
            <div className="PortfolioSection__project embla__slide" key={index}>
              <div className="PortfolioSection__project__content">
                <h3 className="h3">{project.client}</h3>
                <div className="divider mb-4"></div>
                <h4 className="PortfolioSection__project__title h2">
                  {project.title}
                </h4>
                <div
                  className="PortfolioSection__project__description"
                  dangerouslySetInnerHTML={{ __html: project.description }}
                />

                <a
                  href={`${project.url}`}
                  className="btn btn-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Explorer le site
                </a>
              </div>

              <img
                src={`${project.images.node.mediaItemUrl}`}
                alt={`${project.title}`}
                className="PortfolioSection__project__image"
                loading="lazy"
              />
            </div>
          ))}
        </EmblaCarousel>
      </div>
    </div>
  );
}
