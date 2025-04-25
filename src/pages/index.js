import FrontPage from "../templates/FrontPage";
import React from "react";
import { graphql } from "gatsby";
import { useStaticQuery } from "gatsby";

const query = graphql`
  query {
    wpPage(isFrontPage: { eq: true }) {
      home {
        heroSection {
          desc
          title
          logos {
            title
            images {
              nodes {
                altText
                mediaItemUrl
              }
            }
          }
          boutton {
            target
            title
            url
          }
        }
        pageBuilder {
          ... on WpHomePageBuilderTestimonialsLayout {
            desc
            fieldGroupName
            titre
            sousTitre
          }
          ... on WpHomePageBuilderExpertisesLayout {
            fieldGroupName
            title
            subtitle

          }
          ... on WpHomePageBuilderWhySectionLayout {
            desc
            fieldGroupName
            sousTitre
            title
            link {
              target
              title
              url
            }
            item {
              desc
              title
            }
            image {
              node {
                altText
                mediaItemUrl
              }
            }
          }
        }
      }
    }
  }
`;

const IndexPage = () => {
  const data = useStaticQuery(query);
	const { wpPage } = data;
	  const { home } = wpPage;
	  return (
	<FrontPage data={home} />
  );
};

export default IndexPage;
