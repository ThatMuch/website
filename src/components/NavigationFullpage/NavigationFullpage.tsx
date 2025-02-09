import './NavigationFullpage.scss';

import React from 'react';

export default function NavigationFullpage({ anchors, activeSection }) {

  return (
    <ul className={`NavigationFullpage ${activeSection === "Accueil" ? "d-none" : ""}`}>
      {anchors.map((anchor, index) => {
        console.log(anchor === activeSection)
        return (
          <li key={index} className="NavigationFullpage__item">
            <a
              href={"#" + anchor}
              className={anchor === activeSection ? 'active' : 'not'}
            >
              {index === 0 ? "+" : index}
            </a>
          </li>
        )
      })}
    </ul>
  );
}
