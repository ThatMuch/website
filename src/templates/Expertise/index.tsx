import { PageProps, graphql } from "gatsby";
import React, { useMemo } from "react";

import AllPosts from "../../components/AllPosts/AllPosts";
import Layout from "../../components/Layout";
import PageHeader from "../../components/PageHeader";
import Seo from "../../components/Seo";
import type { ThatmuchBlock } from "../../components/GutenbergBlocks/types";
import ThatmuchBlocks from "../../components/GutenbergBlocks/ThatmuchBlocks";
import { useSitePosts } from "../../hooks/use-site-posts";
import { useSiteSeo } from "../../hooks/use-site-seo";

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
    blocks: {
      name: string;
      saveContent: string;
    }[];
  };
}

export default function Expertise({ data }: PageProps<ExpertiseData>) {
  const page = data.wpExpertise;
  const allSitePosts = useSitePosts();
  const { siteUrl } = useSiteSeo();

  const posts = useMemo(() => {
    const categories = page.categories?.nodes ?? [];
    if (categories.length === 0) return [];

    const childSlugs = new Set(
      categories.slice(1).map((cat) => cat.slug).filter(Boolean)
    );
    const parentSlug = categories[0]?.slug;

    let matchedPosts: typeof allSitePosts = [];

    if (childSlugs.size > 0) {
      matchedPosts = allSitePosts.filter((post) =>
        post.categories?.nodes?.some((cat) => childSlugs.has(cat.slug))
      );
    }

    if (matchedPosts.length === 0 && parentSlug) {
      matchedPosts = allSitePosts.filter((post) =>
        post.categories?.nodes?.some((cat) => cat.slug === parentSlug)
      );
    }

    return matchedPosts.slice(0, 4);
  }, [allSitePosts, page.categories]);

  return (
    <Layout>
      <Seo
        title={page.title}
        description={page.seo.metaDesc}
        pathname={`/expertise/${page.slug}`}
        currentPage={page.title}
        schema={{
          "@type": "Service",
          name: page.title,
          description:
            page.descriptionExpertise?.description ?? page.seo.metaDesc,
          serviceType: page.categories?.nodes?.[0]?.name,
          image: page.featuredImage?.node?.mediaItemUrl,
          url: `${siteUrl}/expertise/${page.slug}`,
          provider: { "@id": `${siteUrl}/#organization` },
          areaServed: "FR",
        }}
      />
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
        <AllPosts posts={posts} title="Nos articles sur le sujet" isHome />
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
        icon
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
        faq {
          kicker
          titre
          questions {
            question
            reponse
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
      blocks {
        ... on WpFaqBlockForGutenbergFaqBlock {
          attributesJSON
          saveContent
        }
      }
    }
  }
`;
