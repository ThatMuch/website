import "./style.scss";

import { Cell, Pie, PieChart, Tooltip } from "recharts";

import React from "react";

const COLORS = ["#de3d64", "#fdc500", "#0fc7d2", "#9fdf6c", "#482aa2"];

const CamembertChart = ({ data, onSectionClick }) => {
  // Gère le clic sur une section du camembert
  const handlePieClick = (data, index) => {
    if (onSectionClick && data.value > 0) {
      onSectionClick(data);
    }
  };

  // Gère le clic sur un élément de la légende
  const handleLegendClick = (entry) => {
    if (onSectionClick && entry.value > 0) {
      onSectionClick(entry);
    }
  };

  return (
    <div className="camembert-chart__container">
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          innerRadius={40}
          dataKey="value"
          onClick={handlePieClick}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              stroke="none"
              style={{
                cursor: entry.value > 0 ? "pointer" : "default",
                opacity: entry.value > 0 ? 1 : 0.5,
              }}
            />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) => [value, name]}
          labelFormatter={() => ""}
        />
      </PieChart>

      <div className="camembert-chart__legend">
        {data.map((entry, index) => (
          <div
            key={index}
            className={`camembert-chart__legend-item ${
              entry.value > 0 ? "clickable" : "disabled"
            }`}
            onClick={() => handleLegendClick(entry)}
          >
            <span
              className="camembert-chart__legend-color"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
              aria-label={`Couleur de la section ${entry.name}`}
              role="img"
            />
            <span className="camembert-chart__legend-text">
              {entry.name} ({entry.value})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CamembertChart;
