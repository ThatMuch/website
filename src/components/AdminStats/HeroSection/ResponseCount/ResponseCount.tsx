import "./style.scss";

import React from "react";

type ResponseCountProps = {
  label: string;
  count: number;
};

const ResponseCount = ({ label, count }: ResponseCountProps) => {
  return (
    <div className="ResponseCount">
      <p className="ResponseCount__count">{count} </p>
      <span className="ResponseCount__label">{label}</span>
    </div>
  );
};

export default ResponseCount;
