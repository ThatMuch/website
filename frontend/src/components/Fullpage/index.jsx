import React, { useEffect, useState } from "react"; // Import React

import NavigationFullpage from "../NavigationFullpage/NavigationFullpage"; // Import NavigationFullpage
import ReactFullpage from "@fullpage/react-fullpage"; // Import ReactFullpage and ReactFullpageProps

const Fullpage = ({ sections }) => {
  const [activeSection, setActiveSection] = useState("");
  const [anchors, setAnchors] = useState([]);
  useEffect(() => {
    const array = sections.map((section) => section.anchor);
    setAnchors(array);
  }, [sections]); // Ajout de sections dans le tableau de dépendances

  const onLeave = (origin, destination, direction) => {
    setActiveSection(destination.anchor);
    if (destination.anchor !== "Accueil") {
      document.querySelector(".menu__txt").style.display = "none";
    } else {
      document.querySelector(".menu__txt").style.display = "block";
    }
    console.log("Leaving section", origin.index);
    console.log("Going to section", destination.index);
  };

  return (
    <ReactFullpage
      scrollingSpeed={1000}
      anchors={anchors}
      animateAnchor={true}
      onLeave={onLeave}
      menu=".NavigationFullpage"
      credits={{}} // Add the missing 'credits' property
      render={({ state, fullpageApi }) => (
        <>
          <ReactFullpage.Wrapper>
            {sections.map(({ component, anchor, title }, index) => (
              <React.Fragment key={index}>
                {React.cloneElement(component, {
                  fullpageapi: fullpageApi,
                  index: index,
                  title: title,
                  anchor: anchor,
                })}
              </React.Fragment>
            ))}
          </ReactFullpage.Wrapper>

          {/* {typeof window !== "undefined" &&
            window.location.pathname === "/" && (
              <NavigationFullpage
                anchors={anchors}
                activeSection={activeSection}
              />
            )} */}
        </>
      )}
    />
  );
};

export default Fullpage;
