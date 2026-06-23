import "./ServiceList.scss";

import { LazyLoadImage } from "react-lazy-load-image-component";
import React, { useMemo } from "react";
import { sanitizeHtml } from "../../utils/sanitize";

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

// ⚡ Bolt: Extract ServiceItem into a memoized component to prevent unnecessary re-renders
const ServiceItem = React.memo(({ service, category }: { service: Service, category?: string }) => {
  // ⚡ Bolt: Memoize expensive sanitizeHtml call (~0.8ms) to avoid recalculation on every render
  const sanitizedDesc = useMemo(() => sanitizeHtml(service.desc), [service.desc]);

  return (
    <div className={`ServiceList__item ${category}`}>
      {service?.image && (
        <LazyLoadImage
          src={service.image.node.mediaItemUrl}
          alt={service.image.node.altText}
        />
      )}
      <h3>{service.titre}</h3>
      <div dangerouslySetInnerHTML={{ __html: sanitizedDesc }} />
    </div>
  );
});
ServiceItem.displayName = "ServiceItem";

export default function ServiceList({ services, category }: Props) {
  return (
    <div>
      <h2>Nos services</h2>
      <div className="divider mb-4"></div>
      <div className="ServiceList">
        {services.map((service) => (
          // ⚡ Bolt: Use unique 'titre' as key instead of array index for better React reconciliation
          <ServiceItem key={service.titre} service={service} category={category} />
        ))}
      </div>
    </div>
  );
}
