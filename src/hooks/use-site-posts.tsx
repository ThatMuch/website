import { graphql, useStaticQuery } from "gatsby";

export const useSitePosts = (categorySlug?: string) => {
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
            blocks {
              ... on WpFaqBlockForGutenbergFaqBlock {
                attributesJSON
                saveContent
              }
              name
              saveContent
              innerBlocks {
                name
                saveContent
                attributesJSON
              }
            }
          }
        }
      }
    }
  `);

  // Map data to have only posts
  let posts = data.allWpPost.edges.map(({ node }) => node);

  // Filter posts by category if categorySlug is provided
  if (categorySlug) {
    posts = posts.filter((post) =>
      post.categories.nodes.some((category) => category.slug === categorySlug)
    );
  }

  return posts;
};
