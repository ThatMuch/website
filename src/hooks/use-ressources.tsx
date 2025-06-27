import { graphql, useStaticQuery } from "gatsby";

export const useRessources = (categorySlug?: string) => {
  const data = useStaticQuery(graphql`
    query GET_RESSOURCES {
      allWpTemplate {
        edges {
          node {
            content
            id
            slug
            title
            featuredImage {
              node {
                altText
                mediaItemUrl
                title
              }
            }
            categories {
              nodes {
                name
                slug
              }
            }
            hubspotForm {
              formId
              portalid
              titre
              fieldGroupName
            }
          }
        }
      }
    }
  `);

  let templates = data.allWpTemplate.edges.map((edge) => {
    const { node } = edge;
    return {
      id: node.id,
      slug: node.slug,
      title: node.title,
      content: node.content,
      featuredImage: node.featuredImage?.node,
      hubspotForm: node.hubspotForm,
      category: node.categories?.nodes[0] || {},
      categories: node.categories || [],
    };
  });

  if (categorySlug) {
    templates = templates.filter((post) =>
      post.categories.nodes.some((category) => category.slug === categorySlug)
    );
  }

  return templates;
};
