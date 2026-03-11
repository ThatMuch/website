import React from "react";
import {FaArrowRight} from "react-icons/fa";
import { sanitizeHtml } from "../../utils/sanitize";

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

// ⚡ Bolt Optimization: Wrap ProjectCard in React.memo to prevent
// unnecessary re-renders of cards in the portfolio grid.
const ProjectCard = React.memo(({ project }: { project: ProjectType }) => {
  return (
    <div className="PortfolioSection__project mb-5">
      <div className="PortfolioSection__project__image">
        <img src={project.images.node.mediaItemUrl} alt={project.title} />
      </div>
      <div className="PortfolioSection__project__content">
        <h2 className="h4">{project.client}</h2>
        <div className="divider"></div>
        <h3 className="h2">{project.title}</h3>
        <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(project.description) }} />
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn btn-link">
          Voir le projet <FaArrowRight />
        </a>
      </div>
    </div>
  );
});

export default ProjectCard;
