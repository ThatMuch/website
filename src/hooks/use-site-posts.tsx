import { graphql, useStaticQuery } from "gatsby";
import { useMemo } from "react";

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

  const posts = useMemo(() => {
    // Map data to have only posts
    let allPosts = data.allWpPost.edges.map(({ node }) => node);

    // Filter posts by category if categorySlug is provided
    if (categorySlug) {
      allPosts = allPosts.filter((post) =>
        post.categories.nodes.some((category) => category.slug === categorySlug)
      );
    }
    return allPosts;
  }, [data, categorySlug]);

  return posts;
};
