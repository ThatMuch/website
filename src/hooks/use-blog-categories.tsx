import { graphql, useStaticQuery } from "gatsby";

export const useBlogCategories = () => {
  const data = useStaticQuery(graphql`
    query GET_CATEGORIES {
      allWpCategory(filter: { name: { nin: ["Uncategorized"] } }) {
        nodes {
          name
          slug
          count
          link
          posts {
            nodes {
              id
              title
              link
              featuredImage {
                node {
                  altText
                  mediaItemUrl
                }
              }
              categories {
                nodes {
                  slug
                  name
                }
              }
            }
          }
        }
        totalCount
      }
    }
  `);
  return data.allWpCategory.nodes;
};
