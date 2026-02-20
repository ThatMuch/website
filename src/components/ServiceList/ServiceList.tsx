import "./ServiceList.scss";

import { LazyLoadImage } from "react-lazy-load-image-component";
import React from "react";

interface Service {
  titre: string
  desc: string
  image?: {
    node: {
      mediaItemUrl: string
      altText: string
    }
  }
}

type Props = {
  services: Service[];
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
              <LazyLoadImage
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
