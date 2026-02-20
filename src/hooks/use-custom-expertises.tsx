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
            expertiseContent {
              service {
                desc
                titre
                image {
                  node {
                    altText
                    mediaItemUrl
                  }
                }
              }
              link_label
              desc_exp
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
        services: node.expertiseContent.service.map((service) => ({
          desc: service.desc,
          titre: service.titre,
          image: service?.image?.node,
        })),
        desc: node.expertiseContent.desc_exp,
        category: node.categories.nodes[0]?.slug,
        link_label: node.expertiseContent.link_label,
      };
    });
  }, [data]);

  return expertises;
};
