import "normalize.css";
import "../../style/style.scss";

import Layout from "../../components/Layout";
import React from "react";
import Seo from "../../components/Seo";
import { graphql } from "gatsby";

const Page = ({ data }) => {
  const page = data.wpPage;

  return (
    <Layout>
      <Seo title={page.title} description={page.seo.metaDesc} />
      <main>
        <h1>{page.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      </main>
    </Layout>
  );
};

export default Page;
export const pageQuery = graphql`
  query ($id: String!) {
    wpPage(id: { eq: $id }) {
      title
      content
      slug
      seo {
        metaDesc
        metaKeywords
        title
      }
    }
  }
`;
