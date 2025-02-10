import { graphql, useStaticQuery } from "gatsby";

export const useSitePosts = () => {
  const data = useStaticQuery(graphql`
    query GET_ALL_POSTS {
      allWpPost {
        edges {
          node {
            id
            link
            title
          }
        }
      }
    }
  `);
  return data.allWpPost.edges;
};
