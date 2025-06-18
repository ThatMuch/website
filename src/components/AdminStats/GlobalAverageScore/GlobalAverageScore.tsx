import "./style.scss";
import React from "react";


type Props = {score: number};

export default function GlobalAverageScore({score}: Props) {
  return (
    <div>
      <h2>Moyenne globale sur 100 : {score.toFixed(2)}</h2>
    </div>
  );
}
