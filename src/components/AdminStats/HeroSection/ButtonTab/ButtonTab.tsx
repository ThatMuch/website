import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

const ButtonTab = ({ isActive, onClick, label }) => {
    return (
        <button
            className={`buttonTab ${isActive ? "active" : ""}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

ButtonTab.propTypes = {
    isActive: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
};

export default ButtonTab;