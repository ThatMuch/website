import React from "react";
import * as FaIcons from "react-icons/fa6";
import "./style.scss";

type Props = {
    number: string
    text: string
    iconName:  keyof typeof FaIcons;
};

export const CardNumber: React.FC<Props> = ({
    number,
    iconName,
    text
}) => {
    const IconComponent = FaIcons[iconName] || FaIcons.FaMobile;
    return (
        <div className="cardNumber">
            <div className="d-flex justify-content-between align-items-center">
                <h3 className="NumbersSection__number__title">{number}</h3>
                <IconComponent className="NumbersSection__icon" size={32} />
            </div>
            <p>{text}</p>
        </div>
    );
}