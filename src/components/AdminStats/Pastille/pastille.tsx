import React from "react";
import { scoreResult } from "../utils/scoreResult";
import PropTypes from "prop-types";
import "./style.scss";

const Pastille = ({ value, big = false }) => {
    return (
        <span className={`pastille ${big ? "big" : ""} ${scoreResult(value)}`}>
            {value}
        </span>
    );
};

Pastille.propTypes = {
    value: PropTypes.number.isRequired,
    big: PropTypes.bool,
};

export default Pastille;