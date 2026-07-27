import { PageProps, graphql } from "gatsby";

import AllPosts from "../../components/AllPosts/AllPosts";
import ContactCTA from "../../components/ContactCTA/ContactCTA";
import Layout from "../../components/Layout";
import PageHeader from "../../components/PageHeader";
import React from "react";
import Seo from "../../components/Seo";
import type { ThatmuchBlock } from "../../components/GutenbergBlocks/types";
import ThatmuchBlocks from "../../components/GutenbergBlocks/ThatmuchBlocks";

interface ExpertiseData {
  wpExpertise: {
    title: string;
    slug: string;
    thatmuchBlocks: ThatmuchBlock[];
    descriptionExpertise?: {
      titre: string;
      description: string;
      cta: {
        target: string;
        title: string;
        url: string;
      };
    };
    featuredImage?: {
      node: {
        altText: string;
        mediaItemUrl: string;
      };
    };
    categories: {
      nodes: Array<{
        name: string;
        slug: string;
      }>;
    };
    seo: {
      metaDesc: string;
      metaKeywords?: string;
      title?: string;
    };
  };
}

export default function Expertise({ data }: PageProps<ExpertiseData>) {
  const page = data.wpExpertise;

  console.log(page);

  return (
    <Layout>
      <Seo title={page.title} description={page.seo.metaDesc} />
      <div className="expertise-content">
        <PageHeader
          title={page.title}
          description={
            page.descriptionExpertise?.description ?? page.seo.metaDesc
          }
          cta={page.descriptionExpertise?.cta}
          image={page.featuredImage}
        />

        <ThatmuchBlocks blocks={page.thatmuchBlocks} />
        <AllPosts
          category={page.categories.nodes[0]?.slug}
          title="Nos articles sur le sujet"
          isHome
        />
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query ($id: String!) {
    wpExpertise(id: { eq: $id }) {
      title
      slug
      descriptionExpertise {
        titre
        description
        cta {
          target
          title
          url
        }
      }
      thatmuchBlocks {
        name
        order
        stats {
          stats {
            valeur
            libelle
            couleur
          }
        }
        pourquoi {
          intro
          kicker
          titre
          cartes {
            texte
            titre
          }
        }
        etapes {
          intro
          kicker
          titre
          etapes {
            texte
            titre
          }
        }
        benefices {
          cartes {
            planete {
              alt
              height
              id
              url
              width
            }
            scope
            tag_label
            texte
            titre
          }
          kicker
          titre
        }
        probleme {
          kicker
          titre
          intro
          cartes {
            scope
            tag_label
            titre
            texte
          }
        }
        faites_le_test {
          kicker
          titre
          texte
          bouton_label
          bouton_url
          illustration {
            id
            url
            alt
            width
            height
          }
        }
        promesse {
          kicker
          titre
          contenu
          cartes {
            icone {
              id
              url
              alt
              width
              height
            }
            titre
            texte
          }
        }
      }
      featuredImage {
        node {
          altText
          mediaItemUrl
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      seo {
        metaDesc
        metaKeywords
        title
      }
    }
  }
`;
