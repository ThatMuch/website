import "./PostTOC.scss";

import React from "react";
import { useActiveHeading } from "../TOCBlock/hooks/useActiveHeading";
import { useHeadings } from "../TOCBlock/hooks/useHeadings";

// Fixed sidebar TOC: unlike TOCBlock (placed by editors anywhere in the
// content), this one is hardcoded in PostContent's left column and always
// scans the post's H2/H3 headings, so it needs no attributes from Gutenberg.
const TOC_ATTRIBUTES = {
  includeH2: true,
  includeH3: false,
};

export default function PostTOC() {
  const tocItems = useHeadings(TOC_ATTRIBUTES);
  const activeId = useActiveHeading(tocItems);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <nav className="PostTOC" aria-label="Sommaire">
      <h2 className="PostTOC__title">Sommaire</h2>
      <ol className="PostTOC__list">
        {tocItems.map((item) => (
          <li
            key={item.id}
            className={`PostTOC__item PostTOC__item--level-${item.level} ${
              activeId === item.id ? "PostTOC__item--active" : ""
            }`}
          >
            <button
              className="PostTOC__link"
              type="button"
              onClick={() => scrollToHeading(item.id)}
            >
              {item.text}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
