import './Card.scss';

import React, { FC, useEffect, useRef, useState } from 'react';

import CountUp from 'react-countup';
import SvgCard from '../SVG/SvgCard';

interface CardProps {
  children: React.ReactNode
  color?: String,
  numbers?: boolean,
  size: String
}

const Card: FC<CardProps> = ({ children, color, numbers, size }) => {
  return (
    <div className={`Card Card-${size}`} >
      {numbers ? (
        <p className="Card__numbers">
          <CountUp duration={2} start={11} end={Math.floor(Math.random() * 99999)} />
        </p>) : null}

      <div className={`Card__content ${color ? "Card-" + color : "Card-grey"}`}>
        {children}
      </div>
    </div>
  )
};

export default Card;
