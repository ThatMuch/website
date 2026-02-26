import "./Metrics.scss";

import React from "react";
import { sanitizeHtml } from "../../utils/sanitize";
import Starfleet from "../../images/Starfleet.webp";

type Metric = {
  titre: string;
  description: string;
  number: string;
};
type Props = {
  title: string;
  sousTitre: string;
  description: string;
  metric: Metric[];
};

export default function Metrics({
  title,
  sousTitre,
  description,
  metric,
}: Props) {
  const [isHovered, setIsHovered] = React.useState(0);

  const sanitizedDescription = React.useMemo(
    () => sanitizeHtml(description),
    [description]
  );

  const sanitizedMetrics = React.useMemo(
    () =>
      metric.map((item) => ({
        ...item,
        sanitizedDescription: sanitizeHtml(item.description),
      })),
    [metric]
  );

  return (
    <div className="Metrics">
      <div className="Metrics__header">
        <div className="Metrics__header__text">
          <h2 className="h3">{sousTitre}</h2>
          <div className="divider mb-4"></div>
          <h2>{title}</h2>
          <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
        </div>
        <img src={Starfleet} className="img-fluid" alt="Starfleet" />
      </div>
      <div className="Metrics__list">
        {sanitizedMetrics.map((item, index) => (
          <div
            key={index}
            className={`Metrics__list__item ${
              isHovered === index ? " is-hovered" : ""
            }`}
            onMouseEnter={() => {
              setIsHovered(index);
            }}
            onMouseLeave={() => {
              document.body.classList.remove("is-hovered");
            }}
          >
            <span className="Metrics__list__item__number">{item.number}</span>
            <h3 className="Metrics__list__item__title h4">{item.titre}</h3>
            <div
              className="Metrics__list__item__description"
              dangerouslySetInnerHTML={{ __html: item.sanitizedDescription }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
