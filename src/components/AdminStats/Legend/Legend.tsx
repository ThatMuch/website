import "./style.scss";

import React from "react";
import { categories } from "../utils/categoryIcons";
type LegendProps = {
  questionsData: { slug: string; category: string }[];
  activeTab: string;
  onTabChange: (slug: string) => void;
};
const Legend = ({ questionsData, activeTab, onTabChange }: LegendProps) => {
  return (
    <div className="legend_section">
      <div className="button_section">
        {questionsData.map((category) => {
          const categoryInfo = categories.find((c) => c.key === category.slug);
          const isActive = activeTab === category.slug;

          return (
            <button
              key={category.slug}
              className={`button button-${category.slug} ${
                isActive ? "active" : ""
              }`}
              onClick={() => onTabChange(category.slug)}
            >
              {categoryInfo?.icon} {categoryInfo?.label || category.category}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Legend;
