import { graphql, useStaticQuery } from "gatsby";

export const useSitePosts = () => {
  const data = useStaticQuery(graphql`
    query GET_ALL_POSTS {
      allWpPost(sort: { date: DESC }) {
        edges {
          node {
            id
            link
            title
            categories {
              nodes {
                slug
                name
              }
            }
            content
            date(formatString: "dd/MM/YYYY")
            featuredImage {
              node {
                altText
                mediaItemUrl
              }
            }
            seo {
              metaDesc
              metaKeywords
              title
              twitterDescription
              twitterTitle
            }
          }
        }
      }
    }
  `);
  // map data to have only posts

  const posts = data.allWpPost.edges.map(({ node }) => node);

  return posts;
};
