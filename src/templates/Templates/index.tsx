import AllTemplates from "../../components/AllTemplates/AllTemplates";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Layout from "../../components/Layout";
import PageHeader from "../../components/PageHeader";
import React from "react";
import Seo from "../../components/Seo";
import { graphql } from "gatsby";

type Props = {
  data: {
    wpPage: {
      id: string;
      title: string;
      content: string;
      seo: {
        metaDesc: string;
        metaKeywords: string;
        title: string;
      };
    };
  };
};

export default function Templates({ data }: Props) {
  const page = data?.wpPage;
  return (
    <Layout>
      <Seo title={page.seo.title} description={page.seo.metaDesc} />
      <Breadcrumb
        crumbs={[{ pathname: `/ressources`, label: "Ressources" }]}
        currentPage={page.title}
      />
      <PageHeader title={page.title} description={page.seo.metaDesc} />
      <AllTemplates filter={true} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query ($id: String!) {
    wpPage(id: { eq: $id }) {
      id
      title
      content
      featuredImage {
        node {
          mediaItemUrl
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
