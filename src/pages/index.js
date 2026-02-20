import "bootstrap/dist/css/bootstrap.min.css";
import "../style/style.scss";

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
          ... on WpHomePageBuilderFeaturesLayout {
            fieldGroupName
            title
            sousTitre
            feature {
              description
              title
              number {
                node {
                  altText
                  mediaItemUrl
                }
              }
            }
          }
          ... on WpHomePageBuilderFaqLayout {
            description
            fieldGroupName
            title
            questions {
              description
              title
            }
          }
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
          ... on WpHomePageBuilderPortfolioLayout {
            fieldGroupName
            title
            sousTitre
            description
            project {
              client
              description
              title
              url
              images {
                node {
                  altText
                  title
                  mediaItemUrl
                }
              }
            }
          }

          ... on WpHomePageBuilderWhySectionLayout {
            desc
            fieldGroupName
            subtitle
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
  return <FrontPage data={home} />;
};

export default IndexPage;
