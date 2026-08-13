import "./style.scss";

import Button from "../UI/Button/Button";
import React from "react";

interface Props {
  categories: Array<{ slug: string }>;
}

export default function PostCTA({ categories }: Props) {
  console.log(categories);

  return (
    <div className={`PostCTA `}>
      <div className="PostCTA__content">
        <h3 className="h4">Poursuivre la lecture</h3>
        <div className="divider mb-4"></div>
        <h2 className="h3">Nous sommes là pour vous aider</h2>
        <p>
          N'hésitez pas à nous contacter pour discuter de vos besoins. Nous
          sommes là pour vous aider à réaliser vos projets.
        </p>
        <div className="PostCTA__links">
          <Button
            type="link"
            url="https://meetings-eu1.hubspot.com/mathilde-arconte?uuid=e5cf8126-6dc9-4ec7-947e-2760637a43f2"
            className="mb-4 btn-primary"
          >
            Programmez un appel
          </Button>
          <Button
            type="link"
            url="https://meetings-eu1.hubspot.com/mathilde-arconte?uuid=e5cf8126-6dc9-4ec7-947e-2760637a43f2"
            className="mb-4 btn-white"
          >
            Programmez un appel
          </Button>
        </div>
      </div>
    </div>
  );
}
