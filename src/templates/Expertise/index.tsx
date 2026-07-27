import { PageProps, graphql } from "gatsby";
import AllPosts from "../../components/AllPosts/AllPosts";
import ContactCTA from "../../components/ContactCTA/ContactCTA";
import Layout from "../../components/Layout";
import PageHeader from "../../components/PageHeader";
import React from "react";
import Seo from "../../components/Seo";
import ServiceList from "../../components/ServiceList";

interface Service {
  titre: string;
  desc: string;
  image?: {
    node: {
      altText: string;
      mediaItemUrl: string;
    };
  };
}

interface ExpertiseData {
  wpExpertise: {
    title: string;
    slug: string;
    expertiseContent: {
      desc_exp?: string;
      service: Service[];
    };
    featuredImage?: {
      node: {
        altText: string;
        mediaItemUrl: string;
      };
    };
    categories: {
      nodes: Array<{
        name: string;
        slug: string;
      }>;
    };
    seo: {
      metaDesc: string;
      metaKeywords?: string;
      title?: string;
    };
  };
}

export default function Expertise({ data }: PageProps<ExpertiseData>) {
  const page = data.wpExpertise;

  return (
    <Layout>
      <Seo title={page.title} description={page.seo.metaDesc} />
      <div className="expertise-content">
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
      </div>
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
