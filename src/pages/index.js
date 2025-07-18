import "bootstrap/dist/css/bootstrap.min.css";
import "../style/style.scss";
import "aos/dist/aos.css";

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
          ... on WpHomePageBuilderAboutLayout {
            description
            fieldGroupName
            sousTitre
            title
            metric {
              description
              number
              titre
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
