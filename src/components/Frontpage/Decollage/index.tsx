import "./style.scss";

import CountUp from "react-countup";
import React from "react";
import illustration from "../../../../src/images/Illu_decollage.svg";

export default function Decollage({ index, title, anchor }) {
  return (
    <div id={"deco"} className="section Decollage" data-anchor={anchor}>
      <div className="container">

        <div className="row align-items-center">
          <div className="col-sm-7">
            <span className="section-title__numbers">
              <CountUp
                duration={2}
                start={11}
                end={Math.floor(Math.random() * 99999)}
              />
            </span>
            <h1 className="section-title">
              <span className=" section-title__index">0{index} </span>
              {title}
            </h1>
            <p>
              Prenez votre site en main, nous vous formons sur son utilisation.
              Faites nous vos retours. Nos équipes s’occupent de régler les
              éventuels bugs.
            </p>
            <p>
              Le projet est lancé, il est désormais accessible au public les
              opérations de communication peuvent commencer.
            </p>

          </div>
          <div className="col-sm-5">
            <img src={illustration} alt="décollage THATMUCH" />
          </div>
        </div>
      </div>
    </div>
  );
}
