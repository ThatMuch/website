import * as React from "react";

const SvgCard = (...props) => (
  <svg width="0" height="0">
		<clipPath id="my-clip-path" clipPathUnits="objectBoundingBox">
			<path d="M0,0.033 V0.903 C0,0.914,0.003,0.925,0.01,0.933 L0.046,0.981 A0.049,0.057,0,0,0,0.082,1 H0.971 C0.987,0.981,1,0.966,1,0.947 V0.105 C1,0.087,0.987,0.072,0.971,0.072 H0.296 A0.033,0.038,0,0,1,0.271,0.058 L0.238,0.012 A0.029,0.033,0,0,0,0.216,0 H0.029 C0.013,0,0,0.015,0,0.033"></path>
		</clipPath>
  </svg>
);

export default SvgCard;

