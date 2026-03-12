import "./ContactForm.scss";

import HubspotForm from "react-hubspot-form";
import React from "react";
import { StaticImage } from "gatsby-plugin-image";

type Props = {
  hubspotForm: {
    formId: string;
    portalid: string;
    sousTitre: string;
    titre: string;
  };
};

export default function ContactForm({ hubspotForm }: Props) {
  return (
    <div className="ContactForm">
      <div className="row">
        <div className="col-md-6 position-relative">
          <p className="h3 fw-bold">{hubspotForm.sousTitre}</p>
          <div className="divider mb-4"></div>
          <h1>{hubspotForm.titre}</h1>
          {/* ⚡ Bolt Optimization: Replaced react-lazy-load-image-component with Gatsby StaticImage.
              Impact: Generates highly optimized formats natively, uses browser lazy-loading,
              and prevents cumulative layout shifts via automatic dimensions calculation. */}
          <StaticImage src="../../images/tardis.webp" alt="" aria-hidden="true" />
        </div>
        <div className="col-md-6">
          <HubspotForm
            portalId={hubspotForm.portalid}
            formId={hubspotForm.formId}

          />
        </div>
      </div>
    </div>
  );
}
