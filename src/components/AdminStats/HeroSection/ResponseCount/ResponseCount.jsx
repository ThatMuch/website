import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

const ResponseCount = ({ label, count }) => {
    return (
        <div className="number">
            <span className="month">{label}</span>
            <span className="value">
                {count} {count > 1 ? "réponses" : "réponse"}
            </span>
        </div>
    );
};

ResponseCount.propTypes = {
    label: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
};

export default ResponseCount;