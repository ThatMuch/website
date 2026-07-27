import { graphql, useStaticQuery } from "gatsby";
import { useMemo } from "react";

export const usePostExpertises = () => {
  const data = useStaticQuery(graphql`
    query GET_EXPERTISES {
      allWpExpertise {
        edges {
          node {
            slug
            title
            categories {
              nodes {
                name
                slug
              }
            }
            featuredImage {
              node {
                altText
                mediaItemUrl
              }
            }
            seo {
              metaDesc
            }
          }
        }
      }
    }
  `);

  const expertises = useMemo(() => {
    return data.allWpExpertise.edges.map((edge) => {
      const { node } = edge;
      return {
        slug: node.slug,
        title: node.title,
        featuredImage: node.featuredImage.node,
        desc: node.seo.metaDesc,
        category: node.categories.nodes[0]?.slug,
        link_label: "Découvrir",
      };
    });
  }, [data]);

  return expertises;
};
