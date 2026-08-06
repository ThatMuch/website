import React from "react";
import AllPosts from "../../components/AllPosts/AllPosts";
import AllTemplates from "../../components/AllTemplates/AllTemplates";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Layout from "../../components/Layout";
import PageHeader from "../../components/PageHeader";
import Seo from "../../components/Seo";
import { graphql } from "gatsby";
import { useSiteSeo } from "../../hooks/use-site-seo";

const Ressources = ({ data }) => {
  const page = data?.wpPage;
  const { siteUrl } = useSiteSeo();

  return (
    <Layout>
      <Seo
        title={page?.title}
        description={page?.seo.metaDesc}
        image={page?.featuredImage?.node?.mediaItemUrl}
        pathname="/ressources"
        currentPage={page?.title}
        schema={{
          "@type": "CollectionPage",
          name: page?.title,
          description: page?.seo.metaDesc,
          url: `${siteUrl}/ressources`,
          isPartOf: { "@id": `${siteUrl}/#website` },
        }}
      />
      <Breadcrumb currentPage={page.title} />
      <PageHeader title={page.title} description={page.seo.metaDesc} />
      <AllPosts title="Le blog de l'équipage" isHome />
      <AllTemplates isHome={true} />
    </Layout>
  );
};

export default Ressources;

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
