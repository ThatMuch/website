import "./ContactForm.scss";

import HubspotForm from "react-hubspot-form";
import { LazyLoadImage } from "react-lazy-load-image-component";
import React from "react";
import tardis from "../../images/tardis.webp";

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
          <h2 className="h3">{hubspotForm.sousTitre}</h2>
          <div className="divider mb-4"></div>
          <h1>{hubspotForm.titre}</h1>
          <LazyLoadImage src={tardis} alt="Tardis" />
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
