import './Plan.scss';

import React, { FC } from 'react';

import Card from '../../Card/Card';
import CountUp from 'react-countup';
import Hologram from '../../../images/Hologram.svg'
import SvgFusee from '../../../images/fusee_hologram.svg'
import SvgPlanFusee from '../../SVG/SvgPlanFusee'
import SvgR2D2 from '../../../images/R2D2.svg'

interface PlanProps {
  title: string;
  index: number;
  anchor: string;
}

const Plan: FC<PlanProps> = ({ index, title, anchor }) => (
  <div className="Plan section" data-anchor={anchor}>
    <div className="left">
      <div className='content'>
        <span className="section-title__numbers">
          <CountUp duration={2} start={11} end={Math.floor(Math.random() * 99999)} />
        </span>
        <h1 className="text-white section-title">
          <span className=" section-title__index">0{index} </span>{title}
        </h1>

        <p className='text-white'> Ici nous parlons wireframe low definition et high definition, arborescence et parcours de navigation.</p>
      </div>

      <SvgPlanFusee className="plan_fusee" />
    </div>
    <div className="right">
      <p>Les maquettes sont présentées et soumises à la validation du commanditaire ou des parties prenantes impliquées dans l’entreprise.</p>
      <img src={SvgR2D2} alt="R2D2 Thatmuch" className="R2D2" />
      <img src={SvgFusee} alt="Fusée Hologram Thatmuch" className="fusee_hologram" />
      <img src={Hologram} alt="Hologram Thatmuch" className="hologram" />
    </div>
  </div>
);

export default Plan;
