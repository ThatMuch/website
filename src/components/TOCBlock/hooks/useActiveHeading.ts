import { useState, useEffect } from "react";
import { TocItem } from "../types";

export const useActiveHeading = (tocItems: TocItem[]) => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (tocItems.length === 0) return;

    // Intersection Observer pour mettre en surbrillance le titre actif
    const headingElements = document.querySelectorAll(
      ".post__content h1, .post__content h2, .post__content h3, .post__content h4, .post__content h5, .post__content h6",
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -66%",
        threshold: 0,
      },
    );

    headingElements.forEach((el) => observer.observe(el));

    return () => {
      headingElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [tocItems]);

  return activeId;
};
