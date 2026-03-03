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

// ⚡ Bolt Optimization: Extracted MetricItem and wrapped in React.memo.
// This prevents all items in the list from re-rendering when the user
// hovers over a single item, saving unnecessary DOM updates and improving
// hover interaction performance.
const MetricItem = React.memo(
  ({
    item,
    index,
    isHovered,
    onMouseEnter,
    onMouseLeave,
  }: {
    item: Metric;
    index: number;
    isHovered: boolean;
    onMouseEnter: (index: number) => void;
    onMouseLeave: () => void;
  }) => {
    return (
      <div
        className={`Metrics__list__item ${isHovered ? " is-hovered" : ""}`}
        onMouseEnter={() => onMouseEnter(index)}
        onMouseLeave={onMouseLeave}
      >
        <span className="Metrics__list__item__number">{item.number}</span>
        <h3 className="Metrics__list__item__title h4">{item.titre}</h3>
        <div
          className="Metrics__list__item__description"
          dangerouslySetInnerHTML={{ __html: item.description }}
        />
      </div>
    );
  }
);

export default function Metrics({
  title,
  sousTitre,
  description,
  metric,
}: Props) {
  const [isHovered, setIsHovered] = React.useState(0);

  // ⚡ Bolt Optimization: Memoized event handlers with useCallback
  // to prevent re-creating functions on every render, ensuring
  // MetricItem's React.memo correctly bails out of re-renders.
  const handleMouseEnter = React.useCallback((index: number) => {
    setIsHovered(index);
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    document.body.classList.remove("is-hovered");
  }, []);

  return (
    <div className="Metrics">
      <div className="Metrics__header">
        <div className="Metrics__header__text">
          <h2 className="h3">{sousTitre}</h2>
          <div className="divider mb-4"></div>
          <h2>{title}</h2>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
        <img src={Starfleet} className="img-fluid" alt="Starfleet" />
      </div>
      <div className="Metrics__list">
        {metric.map((item, index) => (
          <MetricItem
            key={index}
            item={item}
            index={index}
            isHovered={isHovered === index}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </div>
    </div>
  );
}
