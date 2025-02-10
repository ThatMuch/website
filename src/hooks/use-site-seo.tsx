// hook for site seo query
import { graphql, useStaticQuery } from "gatsby";

export const useSiteSeo = () => {
  const data = useStaticQuery(graphql`
    query GET_SEO {
      site {
        siteMetadata {
          defaultTitle
          defaultDescription
          siteUrl
          defaultImage
        }
      }
    }
  `);
  return data.site.siteMetadata;
};
