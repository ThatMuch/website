import AllPosts from "../../components/AllPosts/AllPosts";
import ContactCTA from "../../components/ContactCTA/ContactCTA";
import Layout from "../../components/Layout";
import PageHeader from "../../components/PageHeader";
import React from "react";
import Seo from "../../components/Seo";
import ServiceList from "../../components/ServiceList";
import { graphql } from "gatsby";
export default function Expertise({ data }) {
  const page = data.wpExpertise;
  console.log(data);
  return (
    <Layout>
      <Seo title={page.title} description={page.seo.metaDesc} />
      <main>
        <PageHeader
          title={page.title}
          description={page.seo.metaDesc}
          image={page.featuredImage}
        />

        <ServiceList
          services={page.expertiseContent.service}
          category={page.categories.nodes[0].slug}
        />
        <ContactCTA />
        <AllPosts
          category={page.categories.nodes[0].slug}
          title="Nos articles sur le sujet"
          isHome
        />
      </main>
    </Layout>
  );
}

export const pageQuery = graphql`
  query ($id: String!) {
    wpExpertise(id: { eq: $id }) {
      title
      slug
      expertiseContent {
        desc_exp
        service {
          desc
          titre
          image {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
      featuredImage {
        node {
          altText
          mediaItemUrl
        }
      }
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
