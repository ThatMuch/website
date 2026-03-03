import "./TOCBlock.scss";

import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import React, { useState } from "react";
import { useHeadings } from "./hooks/useHeadings";
import { useActiveHeading } from "./hooks/useActiveHeading";

interface TOCAttributes {
  title: string
  collapsible?: boolean
  includeH1?: boolean
  includeH2?: boolean
  includeH3?: boolean
  includeH4?: boolean
  includeH5?: boolean
  includeH6?: boolean
}

type Props = {
  attributes?: TOCAttributes;
};

export default function TOCBlock({ attributes }: Props) {
  const tocItems = useHeadings(attributes);
  const activeId = useActiveHeading(tocItems);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  // Fonction pour faire défiler vers un titre
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Ne rien afficher s'il n'y a pas de titres
  if (tocItems.length === 0) {
    return null;
  }

  return (
    <div className="toc-block">
      <div className="toc-block__container">
        <div
          className={`toc-block__header ${
            attributes?.collapsible ? "collapsible" : ""
          }`}
          onClick={() => attributes?.collapsible && setIsCollapsed(!isCollapsed)}
        >
          <h2 className="toc-block__title h3">{attributes?.title}</h2>
          {attributes?.collapsible && (
            <button className="toc-block__collapsible-button">
              {isCollapsed ? <FiChevronDown /> : <FiChevronUp />}
            </button>
          )}
        </div>
        {isCollapsed && (
          <nav className="toc-block__nav">
            <ol className="toc-block__list">
              {tocItems.map((item) => (
                <li
                  key={item.id}
                  className={`toc-block__item toc-block__item--level-${
                    item.level
                  } ${activeId === item.id ? "toc-block__item--active" : ""}`}
                >
                  <button
                    className="toc-block__link"
                    onClick={() => scrollToHeading(item.id)}
                    type="button"
                  >
                    {item.text}
                  </button>
                </li>
              ))}
            </ol>
          </nav>
        )}
      </div>
    </div>
  );
}
