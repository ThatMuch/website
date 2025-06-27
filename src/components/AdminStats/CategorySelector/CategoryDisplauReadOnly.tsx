import React from "react";
import { MdAdsClick, MdDesignServices, MdSearch } from "react-icons/md";
import { SiTmux } from "react-icons/si";
import { TiSpanner } from "react-icons/ti";
import { FaScaleBalanced } from "react-icons/fa6";
import { IoStatsChart } from "react-icons/io5";

const MAX_HEIGHT = 380;
const COMPACT_THRESHOLD = 145;

const icons = {
  design: <MdDesignServices className="step-icon" />,
  marketing: <MdAdsClick className="step-icon" />,
  ux: <SiTmux className="step-icon" />,
  seo: <MdSearch className="step-icon" />,
  performance: <IoStatsChart className="step-icon" />,
  technique: <TiSpanner className="step-icon" />,
  legal: <FaScaleBalanced className="step-icon" />,
};

const CategoryDisplayReadOnly = ({ categories, globalScore }) => {
  const sorted = [...categories].sort((a, b) => a.percentage - b.percentage);
  const scoreResult = (globalScore) => {
    if (globalScore >= 66) {
      return "good";
    } else if (globalScore >= 33) {
      return "medium";
    } else {
      return "low";
    }
  };

  return (
    <div className="categoryContent">
      <div className="buttons">
        <div className="pill-wrapper">
          {sorted.map((category) => {
            const height = (category.percentage / 100) * MAX_HEIGHT;
            const isCompact = height < COMPACT_THRESHOLD;

            return (
              <div
                key={category.slug}
                className={`category-pill ${category.slug} ${
                  isCompact ? "compact" : ""
                }`}
                style={{ height: `${height}px`, cursor: "default" }}
              >
                <div className="score">{category.averageScore.toFixed(0)}</div>
                {/* <div className="label">{category.slug}</div> */}
                <div className="icon">{icons[category.slug]}</div>
              </div>
            );
          })}
          <div className={`averageGlobalScore ${scoreResult(globalScore)}`}>
            {globalScore}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDisplayReadOnly;
