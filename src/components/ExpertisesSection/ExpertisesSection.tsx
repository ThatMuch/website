import "./ExpertisesSection.scss";

import React from "react";

//import { usePostExpertises } from "../../hooks/use-custom-expertise";

type Props = {
  section: {
    title: string;
    subtitle: string;
  };
};

export default function ExpertisesSection({ section }: Props) {
  // const expertises = usePostExpertises();
  // console.log("exp", expertises);
  return (
    <div className="ExpertisesSection">
      <h2 className="h3">{section.subtitle}</h2>
      <div className="divider mb-4"></div>
      <h3 className="h2">{section.title}</h3>
    </div>
  );
}
