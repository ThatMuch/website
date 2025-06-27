import "./style.scss";

import { MdAdsClick, MdDesignServices, MdSearch } from "react-icons/md";

import { FaScaleBalanced } from "react-icons/fa6";
import { IoStatsChart } from "react-icons/io5";
import React from "react";
import { SiTmux } from "react-icons/si";
import { TiSpanner } from "react-icons/ti";

const MAX_HEIGHT = 380;
const COMPACT_THRESHOLD = 145;

const CategorySelector = ({
  averageGlobalScore,
  totalSubmissions,
  categories,
  selectedSlug,
  onSelect,
}) => {
  const sorted = [...categories].sort((a, b) => a.percentage - b.percentage);

  const icons = {
    design: <MdDesignServices className="step-icon" />,
    marketing: <MdAdsClick className="step-icon" />,
    ux: <SiTmux className="step-icon" />,
    seo: <MdSearch className="step-icon" />,
    performance: <IoStatsChart className="step-icon" />,
    technique: <TiSpanner className="step-icon" />,
    legal: <FaScaleBalanced className="step-icon" />,
  };

  return (
    <div className="categoryContent">
      <div className="buttons">
        <div className="pill-wrapper">
          {sorted.map((category) => {
            const width = (category.percentage / 100) * MAX_HEIGHT;
            const isCompact = width < COMPACT_THRESHOLD;

            return (
              <button
                key={category.slug}
                onClick={() => onSelect(category.slug)}
                className={`category-pill ${
                  selectedSlug === category.slug ? "selected" : ""
                } ${category.slug} ${isCompact ? "compact" : ""}`}
                style={{ width: `${width}px` }}
              >
                <div className="score">{category.averageScore.toFixed(0)}</div>
                <div className="label">{category.slug}</div>
                <div className="icon">{icons[category.slug]}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategorySelector;
