import React from "react";
import { FaScaleBalanced } from "react-icons/fa6";
import { IoStatsChart } from "react-icons/io5";
import { MdDesignServices, MdAdsClick, MdSearch } from "react-icons/md";
import { SiTmux } from "react-icons/si";
import { TiSpanner } from "react-icons/ti";

export const categories = [
  { key: "design", label: "Design", icon: <MdDesignServices className="step-icon" /> },
  { key: "marketing", label: "Marketing", icon: <MdAdsClick className="step-icon" /> },
  { key: "ux", label: "UX", icon: <SiTmux className="step-icon" /> },
  { key: "seo", label: "SEO", icon: <MdSearch className="step-icon" /> },
  { key: "performance", label: "Performance", icon: <IoStatsChart className="step-icon" /> },
  { key: "technique", label: "Technique", icon: <TiSpanner className="step-icon" /> },
  { key: "legal", label: "Légal", icon: <FaScaleBalanced className="step-icon" /> },
];