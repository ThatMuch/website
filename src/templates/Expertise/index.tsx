import Layout from "../../components/Layout";
import React from "react";
import Seo from "../../components/Seo";
import { graphql } from "gatsby";

export default function Expertise({ data }) {
  const page = data.wpExpertise;
  console.log(data);
  return (
    <Layout>
      <Seo title={page.title} description={page.seo.metaDesc} />
      <main>
        <h1>{page.title}</h1>
      </main>
    </Layout>
  );
}

export const pageQuery = graphql`
  query ($id: String!) {
    wpExpertise(id: { eq: $id }) {
      title
      slug
      categories {
        nodes {
          name
          slug
        }
      }
      seo {
        metaDesc
        metaKeywords
        title
      }
    }
  }
`;
