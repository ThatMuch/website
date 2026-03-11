import React, { useMemo } from "react";
import ProjectCard, { ProjectType } from "../ProjectCard/ProjectCard";
import { sanitizeHtml } from "../../utils/sanitize";

type Props = {
  section: {
    title: string;
    sousTitre: string;
    description: string;
    project: ProjectType[];
  };
};

export default function PortfolioSection({ section }: Props) {
  const { title, sousTitre, description, project = [] } = section || {};

  // ⚡ Bolt Optimization: Memoize array filtering to prevent O(N) recalculations on every render.
  // Séparation en fonction de l'index : impaire (1, 3, 5...) et paire (0, 2, 4...)
  const oddProjects = useMemo(() => project.filter((_, index) => index % 2 !== 0), [project]);
  const evenProjects = useMemo(() => project.filter((_, index) => index % 2 === 0), [project]);

  return (
    <div className="PortfolioSection">
      <div className="row">
        {/* Colonne 1 : Index impairs */}
        <div className="col-sm-6">
          <div className="section__header">
            <h2 className="h3">{title}</h2>
            <div className="divider mb-4"></div>
            <h2 className="h2 mb-5">{sousTitre}</h2>
          </div>
          {oddProjects.map((p) => (
            <ProjectCard key={p.title || p.client} project={p} />
          ))}
        </div>

        {/* Colonne 2 : Index pairs */}
        <div className="col-sm-6">
          {evenProjects.map((p) => (
            <ProjectCard key={p.title || p.client} project={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
