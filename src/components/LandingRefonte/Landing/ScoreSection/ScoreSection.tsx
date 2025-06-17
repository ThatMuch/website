import "./style.scss";

import React from "react";
import scoreImage from "./ScoreInbox.png";

type Props = {};

export default function ScoreSection({}: Props) {
  return (
    <div className="ScoreSection">
      <div>
        <h2>Le score inbox</h2>
        <div className="divider mb-4"></div>
        <p>
          Recevez votre score dans votre boîte mail, et identifiez avec
          précision les axes à refondre sur votre site.
        </p>
      </div>
      <img src={scoreImage} alt="Score refonte site web" className="ScoreSection__image"/>
    </div>
  );
}
