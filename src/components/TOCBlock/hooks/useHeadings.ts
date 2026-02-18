import { useState, useEffect } from "react";
import { TocItem } from "../types";
import { generateId } from "../utils";

export const useHeadings = (attributes: any) => {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);

  useEffect(() => {
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

    // Délai pour s'assurer que le DOM est complètement rendu
    const timer = setTimeout(() => {
      extractHeadings();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [attributes]);

  return tocItems;
};
