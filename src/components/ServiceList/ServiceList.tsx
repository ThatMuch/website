import "./ServiceList.scss";

import React from "react";

type Props = {
  services: any[];
  category?: string;
};

export default function ServiceList({ services, category }: Props) {
  return (
    <div>
      <h2>Nos services</h2>
      <div className="divider mb-4"></div>
      <div className="ServiceList">
        {services.map((service, index) => (
          <div key={index} className={`ServiceList__item ${category}`}>
            {service?.image && (
              <img
                src={service.image.node.mediaItemUrl}
                alt={service.image.node.altText}
              />
            )}
            <h3>{service.titre}</h3>
            <div dangerouslySetInnerHTML={{ __html: service.desc }} />
          </div>
        ))}
      </div>
    </div>
  );
}
