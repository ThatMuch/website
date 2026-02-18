import "./TOCBlock.scss";

import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import React, { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
  // Ajout d'un type pour les paramètres optionnels
}

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
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  useEffect(() => {
    // Fonction pour générer un ID unique basé sur le texte
    const generateId = (text: string): string => {
      return text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "") // Enlever les caractères spéciaux
        .replace(/\s+/g, "-") // Remplacer les espaces par des tirets
        .trim();
    };

    // Fonction pour extraire les titres de la page
    const extractHeadings = () => {
      // Sélectionner tous les titres mais exclure ceux du footer
      const headings = document.querySelectorAll(
        ".post__content h1, .post__content h2, .post__content h3, .post__content h4, .post__content h5, .post__content h6",
      );
      // filter headings based on attributes
      const filteredHeadings = Array.from(headings).filter((heading) => {
        const {
          includeH1 = false,
          includeH2 = true,
          includeH3 = false,
          includeH4 = false,
          includeH5 = false,
          includeH6 = false,
        } = attributes || {};
        switch (heading.tagName) {
          case "H1":
            return includeH1;
          case "H2":
            return includeH2;
          case "H3":
            return includeH3;
          case "H4":
            return includeH4;
          case "H5":
            return includeH5;
          case "H6":
            return includeH6;
          default:
            return false;
        }
      });

      // exlude heading with classname toc-block__title
      const tocTitle = document.querySelector(".toc-block__title");
      if (tocTitle) {
        filteredHeadings.forEach((heading) => {
          if (heading.classList.contains("toc-block__title")) {
            heading.remove();
          }
        });
      }

      const items: TocItem[] = [];
      const usedIds = new Set<string>();

      filteredHeadings.forEach((heading) => {
        const text = heading.textContent?.trim();
        if (!text) return;

        // Générer un ID unique
        let baseId = generateId(text);
        let finalId = baseId;
        let counter = 1;

        // S'assurer que l'ID est unique
        while (usedIds.has(finalId)) {
          finalId = `${baseId}-${counter}`;
          counter++;
        }
        usedIds.add(finalId);

        // Ajouter l'ID au titre s'il n'en a pas déjà un
        if (!heading.id) {
          heading.id = finalId;
        }

        // Extraire le niveau du titre (h1 = 1, h2 = 2, etc.)
        const level = parseInt(heading.tagName.charAt(1));

        items.push({
          id: heading.id || finalId,
          text,
          level,
        });
      });

      setTocItems(items);
    };

    // Intersection Observer pour mettre en surbrillance le titre actif
    const observeHeadings = () => {
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
      };
    };

    // Délai pour s'assurer que le DOM est complètement rendu
    const timer = setTimeout(() => {
      extractHeadings();
      observeHeadings();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

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
            attributes.collapsible ? "collapsible" : ""
          }`}
          onClick={() => attributes.collapsible && setIsCollapsed(!isCollapsed)}
        >
          <h2 className="toc-block__title h3">{attributes.title}</h2>
          {attributes.collapsible && (
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
