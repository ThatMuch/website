import "./style.scss";

import React from "react";

type ButtonTabProps = {
  isActive: boolean;
  onClick: () => void;
  label: string;
};
const ButtonTab = ({ isActive, onClick, label }: ButtonTabProps) => {
  return (
    <button
      className={`buttonTab ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
export default ButtonTab;
