import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Layout from "../../components/Layout";
import React from "react";
import Seo from "../../components/Seo";
import { graphql } from "gatsby";

export default function Template({ data }) {
  const page = data.wpTemplate;
  return (
    <Layout type="template">
      <Seo title={page.title} description={page.seo.metaDesc} />
      <main>
        <Breadcrumb
          crumbs={[
            {
              pathname: `/ressources`,
              label: "Ressources",
            },
          ]}
          currentPage={page.title}
        />
      </main>
    </Layout>
  );
}

export const pageQuery = graphql`
  query ($id: String!) {
    wpTemplate(id: { eq: $id }) {
      id
      slug
      title
      content
      featuredImage {
        node {
          altText
          mediaItemUrl
          title
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      hubspotForm {
        formId
        portalid
        titre
        fieldGroupName
      }
      seo {
        metaDesc
        metaKeywords
        title
      }
    }
  }
`;
