import "./ProjectCard.scss";

import { FaArrowRight } from "react-icons/fa";
import React from "react";

export type ProjectType = {
  client: string;
  url: string;
  images: {
    node: {
      mediaItemUrl: string;
    };
  };
  title: string;
  description: string;
};

export default function ProjectCard({ project }: { project: ProjectType }) {
  return (
    <div className="ProjectCard">
      <div className="ProjectCard__image">
        <img src={project.images.node.mediaItemUrl} alt={project.title} />
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
