import "./TemplateForm.scss";

import HubspotForm from "react-hubspot-form";
import { LazyLoadImage } from "react-lazy-load-image-component";
import React from "react";

type Props = {
  title?: string;
  hubspotForm?: {
    formId: string;
    portalid: string;
  };
  image?: {
    mediaItemUrl: string;
    altText: string;
  };
};

export default function TemplateForm({ hubspotForm, title, image }: Props) {
  return (
    <div className="TemplateForm">
      <div>
        <h3>{title}</h3>
        {hubspotForm && (
          <HubspotForm
            portalId={hubspotForm.portalid}
            formId={hubspotForm.formId}
          />
        )}
      </div>
      {image && (
        <LazyLoadImage
          alt={image.altText}
          src={image.mediaItemUrl}
          effect="blur"
        />
      )}
    </div>
  );
}
