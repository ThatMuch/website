import "./style.scss";

import { MdAdsClick, MdDesignServices, MdSearch } from "react-icons/md";

import { FaScaleBalanced } from "react-icons/fa6";
import { IoStatsChart } from "react-icons/io5";
import Pastille from "../Pastille/Pastille";
import React from "react";
import { SiTmux } from "react-icons/si";
import { TiSpanner } from "react-icons/ti";
import { categories as categoriesIcon } from "../utils/categoryIcons";

const MAX_HEIGHT = 380;
const COMPACT_THRESHOLD = 145;

type CategorySelectorProps = {
  categories: Array<{
    slug: string;
    averageScore: number;
    percentage: number;
  }>;
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
  globalScore?: number;
  title?: string;
};

const CategorySelector = ({
  categories,
  selectedSlug,
  onSelect,
  globalScore,
  title,
}: CategorySelectorProps) => {
  return (
    <div className="categoryContent">
      {title && <h3>{title}</h3>}
      {globalScore !== undefined && <Pastille value={globalScore} big />}
      <div className="buttons">
        <div className="pill-wrapper">
          {categories.map((category) => {
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
                <div className="icon">
                  {
                    categoriesIcon.find((icon) => icon.key === category.slug)
                      ?.icon
                  }
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategorySelector;
