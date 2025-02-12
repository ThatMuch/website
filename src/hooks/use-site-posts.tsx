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
            categories {
              nodes {
                slug
                name
              }
            }
            content
            date(formatString: "d/MM/YYYY")
            featuredImage {
              node {
                altText
                mediaItemUrl
                localFile {
                  childImageSharp {
                    gatsbyImageData
                  }
                }
              }
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
