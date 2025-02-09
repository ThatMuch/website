import './Program.scss';

import React, { FC } from 'react';

import Background_Bifrost from "../../SVG/Background_Bifrost"
import Card from "../../Card/Card"

interface ProgramProps {
  index: number;
  title: string;
  fullpageapi: any;
  anchor: string;
}

const Program: FC<ProgramProps> = ({ title, index, anchor }) => (
  <div className="Program section position-relative" data-anchor={anchor}>
    <div className="bg__wrapper">
      {/* <Background_Bifrost /> */}
    </div>
    <div className="container position-relative d-flex flex-column justify-content-center align-items-center">

      <Card numbers={true} size="XL">
        <h1 className='mt-0'><span className="fw-normal">0{index}</span> {title}</h1>
        <div className="row">
          <div className="col-sm-6">
            <p>Prenez rendez-vous avec l’équipage, pour nous présentez votre projet et nous définirons ensemble le périmètre de la mission / le plan de vol.</p>
          </div>
          <div className="col-sm-6">
            <p>Nous organisons des ateliers avec vous où plusieurs pistes sont explorées: brainstorming, étude des personas, premières directions graphiques et techniques ...</p>
          </div>
        </div>
        {/* <img src={GreenPlanet} alt="Green planet" className='green_planet' /> */}

      </Card>
    </div>
  </div >
);

export default Program;
