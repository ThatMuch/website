import "./ProjectCard.scss";

import { GatsbyImage, IGatsbyImageData, getImage } from "gatsby-plugin-image";

import { FaArrowRight } from "react-icons/fa";
import React from "react";

export type ProjectType = {
  client: string;
  url: string;
  images: {
    node: {
      mediaItemUrl: string;
      altText?: string;
      localFile?: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData;
        };
      };
    };
  };
  title: string;
  description: string;
};

export default function ProjectCard({ project }: { project: ProjectType }) {
  const image = project.images.node;
  const gatsbyImage = image.localFile?.childImageSharp?.gatsbyImageData
    ? getImage(image.localFile.childImageSharp.gatsbyImageData)
    : null;

  return (
    <div className="ProjectCard">
      <div className="ProjectCard__image">
        {gatsbyImage ? (
          <GatsbyImage image={gatsbyImage} alt={image.altText || project.title} />
        ) : (
          <img src={image.mediaItemUrl} alt={image.altText || project.title} />
        )}
      </div>
      <div className="ProjectCard__content ">
        <h2 className="h4">{project.client}</h2>
        <div className="divider"></div>
        <h3 className="h2 ">{project.title}</h3>
        <div
          dangerouslySetInnerHTML={{ __html: project.description }}
          className="ProjectCard__content__description"
        />
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-link"
          >
            Voir le projet <FaArrowRight />
          </a>
        )}
      </div>
    </div>
  );
}
