import "./style.scss";

import Button from "../UI/Button/Button";
import React from "react";

interface Props {
  categories: Array<{ slug: string }>;
}

type ContentKey = "refonte" | "siteWeb";

// Regroupe tous les slugs WordPress équivalents sous une même clé de contenu.
// Pour ajouter un cas, ajoute simplement le slug à la liste correspondante.
const CATEGORY_SLUG_MAP: Record<ContentKey, string[]> = {
  refonte: ["refonte", "refonte-design"],
  siteWeb: ["siteWeb"],
};

function getContentKey(categories: Array<{ slug: string }>): ContentKey | null {
  const slugs = categories.map((category) => category.slug);
  const match = (
    Object.keys(CATEGORY_SLUG_MAP) as Array<keyof typeof CATEGORY_SLUG_MAP>
  ).find((key) => CATEGORY_SLUG_MAP[key].some((slug) => slugs.includes(slug)));
  return match ?? null;
}

export default function PostCTA({ categories }: Props) {
  const categorySlug = getContentKey(categories);
  if (!categorySlug) {
    return null;
  }
  const content: Record<
    ContentKey,
    {
      kicker: string;
      title: string;
      description: string;
      links: Array<{
        label: string;
        url: string;
        type: string;
        target?: string;
      }>;
    }
  > = {
    refonte: {
      kicker: "Audit refonte",
      title: "Faites le test !",
      description:
        "Découvrez si votre site a besoin d'être modernisé, optimisé ou refondu pour répondre aux standards actuels de performance, de sécurité et d'expérience utilisateur.",
      links: [
        {
          label: "Faire le test",
          url: "https://audit-refonte.thatmuch.fr/",
          type: "primary",
          target: "_blank",
        },
        {
          label: "Contactez-nous",
          url: "https://thatmuch.fr/contact/",
          type: "white",
        },
      ],
    },
    siteWeb: {
      kicker: "Nous sommes là pour vous aider",
      title: "Lancez-vous vers le succès",
      description:
        "Le succès de votre projet est notre priorité. Nos équipes vous accompagnent à chaque étape de votre projet, de l'audit initial à la mise en production.",
      links: [
        {
          label: "Création d'un site web",
          url: "https://thatmuch.fr/expertise/creation-site-internet-paris/",
          type: "primary",
        },
        {
          label: "Nous contacter",
          url: "https://thatmuch.fr/contact/",
          type: "white",
        },
      ],
    },
  };

  const { kicker, title, description, links } = content[categorySlug];

  return (
    <div className={`PostCTA `}>
      <div className="PostCTA__content">
        <h3 className="h4">{kicker}</h3>
        <div className="divider mb-4"></div>
        <h2 className="h3">{title}</h2>
        <p>{description}</p>
        <div className="PostCTA__links">
          {links.map((link) => (
            <Button
              key={link.label + link.type}
              type="link"
              url={link.url}
              className={`mb-4 btn-${link.type}`}
              {...(link.target && { target: link.target })}
            >
              {link.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
