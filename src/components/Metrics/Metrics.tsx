import "./Metrics.scss";

import React from "react";
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
  return (
    <div className="Metrics">
      <div className="Metrics__header">
        <div>
          <h2 className="h3">{sousTitre}</h2>
          <div className="divider mb-4"></div>
          <h3 className="h2">{title}</h3>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
        <img src={Starfleet} className="img-fluid" alt="Starfleet" />
      </div>
      <div className="Metrics__list">
        {metric.map((item, index) => (
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
            <h4 className="Metrics__list__item__title">{item.titre}</h4>
            <div
              className="Metrics__list__item__description"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
