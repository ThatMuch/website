import { graphql, useStaticQuery } from "gatsby";

export const useSiteCustomPosts = () => {
  const data = useStaticQuery(graphql`
    query GET_TESTIMONIALS {
      allWpTestimonial {
        edges {
          node {
            title
            testimonialContent {
              citation
              nom
              stars
              role
            }
          }
        }
      }
    }
  `);
  return data;
};
