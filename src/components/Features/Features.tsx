import "./Features.scss";

import React from "react";

type Props = {
  title: string;
  subtitle: string;
  features: {
    title: string;
    description: string;
    number: {
      node: {
        mediaItemUrl: string;
        altText: string;
      };
    };
  }[];
};

export default function Features({ title, subtitle, features }: Props) {
  return (
    <div className="FeaturesSection">
      <h2 className="h3">{subtitle}</h2>
      <div className="divider mb-4"></div>
        <h2>{title}</h2>
      <ul className="FeaturesSection__list">
        {features?.map((feature, index) => (
          <li key={index} className="FeaturesSection__list__item">
            <div className="FeaturesSection__list__item__icon">
              <img
                src={feature.number.node.mediaItemUrl}
                alt={feature.number.node.altText}
              />
            </div>
            <h4>{feature.title}</h4>
            <p>{feature.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
