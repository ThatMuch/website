import "./style.scss";

import HubSpotForm from "../../HubsportForm";
import React from "react";
import illustration from "../../../images/yoda.png";

export default function Contact({ index, title, anchor }) {
  return (
    <div id="contactSection" className="section Contact" data-anchor={anchor}>
      <div className="container">
        <span className="titre">
          Contact
          <div className="divider"></div>
        </span>
        <h1 className="text-white section-title">
          Des envies vous avez, nous écrire vous voulez ? nous contacter vous
          pouvez
        </h1>
        <div className="row align-items-center">
          <div className="col-sm-7">
            <img src={illustration} alt="yoda THATMUCH" />
          </div>

          <div className="col-sm-5 ctc">
            <HubSpotForm />
          </div>
        </div>
      </div>
    </div>
  );
}
