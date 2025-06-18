import "./style.scss";
import React from "react";


type Props = { averages: Object };

export default function AveragesByCategory({ averages }: Props) {
    if (!averages || Object.keys(averages).length === 0) {
    return <p>Aucune donnée de moyenne par catégorie.</p>;
  }

  return (
    <div>
      <h2>Moyennes par catégorie</h2>
      <ul>
        {Object.entries(averages)
          .sort(([, a], [, b]) => a - b)
          .map(([category, average]) => (
            <li key={category}>
              {category} : {average.toFixed(2)}
            </li>
          ))}
      </ul>
    </div>
  );
}