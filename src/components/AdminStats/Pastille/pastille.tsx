import "./style.scss";

import React from "react";
import { scoreResult } from "../utils/scoreResult";

type PastilleProps = {
  value: number;
  big?: boolean;
};
const Pastille = ({ value, big = false }: PastilleProps) => {
  return (
    <span className={`pastille ${big ? "big" : ""} ${scoreResult(value)}`}>
      {value}
    </span>
  );
};

export default Pastille;
