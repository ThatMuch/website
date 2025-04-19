import FrontPage from "../templates/FrontPage";
import React from "react";
import { graphql } from "gatsby";
import { useStaticQuery } from "gatsby";

const query = graphql`
  query {
    wpPage(isFrontPage: { eq: true }) {
      home {
        pageBuilder {
          ... on WpHomePageBuilderWhySectionLayout {
            desc
            sousTitre
            title
            fieldGroupName
            image {
              node {
                altText
                mediaItemUrl
              }
            }
            link {
              target
              title
              url
            }
            item {
              desc
              fieldGroupName
              title
            }
          }
          ... on WpHomePageBuilderServicesLayout {
            fieldGroupName
            title
            titr {
              desc
              titre
              fieldGroupName
              link {
                target
                title
                url
              }
              image {
                node {
                  altText
                  mediaItemUrl
                }
              }
              products {
                desc
                titre
                fieldGroupName
                image {
                  node {
                    altText
                    mediaItemUrl
                  }
                }
              }
            }
          }
          ... on WpHomePageBuilderTestimonialsLayout {
            desc
            fieldGroupName
            sousTitre
            titre
          }
        }
        heroSection {
          boutton {
            target
            title
            url
          }
          desc
          logos {
            title
            images {
              nodes {
                altText
                mediaItemUrl
              }
            }
          }
          title
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
