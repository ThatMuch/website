import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip,
} from 'recharts';
import './style.scss';

const COLORS = ['#5B8FF9', '#5AD8A6', '#F6BD16', '#E8684A', '#6DC8EC'];

const CamembertChart = ({ data }) => {
  return (
    <div className="camembert-chart__container">
      <PieChart width={300} height={300}>
        <defs>
          {/* Définition d’un filtre de néon */}
          <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#00ffff" floodOpacity="0.7" />
            <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#00ffff" floodOpacity="0.5" />
          </filter>
        </defs>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          innerRadius={60}
          label
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}stroke="none" />
          ))}
        </Pie>
        <Tooltip />
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