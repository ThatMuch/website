import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip,
} from 'recharts';
import './style.scss';

const COLORS = ['#7F00FF', '#eb4d4b', '#f6b93b', '#60a3bc', '#78e08f'];

const CamembertChart = ({ data }) => {
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
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              stroke="none"
            />
          ))}
        </Pie>
      </PieChart>

      <div className="camembert-chart__legend">
        {data.map((entry, index) => (
          <div key={index} className="camembert-chart__legend-item">
            <span
              className="camembert-chart__legend-color"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
              aria-label={`Couleur de la section ${entry.name}`}
              role="img"
            />
            <span className="camembert-chart__legend-text">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CamembertChart;