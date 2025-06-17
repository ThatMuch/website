import "./Newsletter.scss";

import HubspotForm from "react-hubspot-form";
import { LazyLoadImage } from "react-lazy-load-image-component";
import React from "react";
import image from "../../images/Planetes.png";

type Props = {};

export default function Newsletter({}: Props) {
  return (
    <div className="Newsletter">
      <LazyLoadImage
        className="Newsletter__image"
        src={image}
        alt="Ensemble de planètes"
      />
      <div className="Newsletter__content">
        <div>
          <h2 className="mb-4">Newsletter</h2>
          <p>
            Ne manquez rien de l'actualité du web et de nos dernières créations
            ! Recevrez régulièrement des articles exclusifs sur le marketing
            digital, le design web et les technologies émergentes.
          </p>
        </div>

        <HubspotForm
          portalId="25329660"
          formId="e8578e88-8621-4238-9623-3a4263b0390b"
          onSubmit={() => console.log("Submit!")}
          onReady={(form) => console.log("Form ready!")}
        />
      </div>
    </div>
  );
}
