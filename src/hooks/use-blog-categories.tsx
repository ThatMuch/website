import { graphql, useStaticQuery } from "gatsby";

export const useBlogCategories = () => {
  const data = useStaticQuery(graphql`
    query GET_CATEGORIES {
      allWpCategory(filter: { name: { nin: ["Uncategorized", "Podcast"] } }) {
        nodes {
          name
          slug
          count
          link
        }
      }
    }
  `);
  return data.allWpCategory.nodes;
};
