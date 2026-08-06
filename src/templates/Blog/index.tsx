import { PageProps, graphql } from "gatsby";

import AllPosts from "../../components/AllPosts/AllPosts";
import Layout from "../../components/Layout";
import Newsletter from "../../components/Newsletter";
import PageHeader from "../../components/PageHeader";
import React from "react";
import Seo from "../../components/Seo";
import { useSiteSeo } from "../../hooks/use-site-seo";

interface BlogPageProps extends PageProps {
  data: {
    wpPage: {
      title: string;
      seo: {
        metaDesc: string;
      };
      featuredImage: {
        node: {
          mediaItemUrl: string;
        };
      };
    };
  };
}

const BlogPage: React.FC<BlogPageProps> = ({ data }) => {
  const page = data.wpPage;
  const { siteUrl } = useSiteSeo();
  return (
    <Layout type="blog">
      <Seo
        title={page.title}
        description={page.seo.metaDesc}
        image={page?.featuredImage?.node?.mediaItemUrl}
        pathname="/blog"
        currentPage={page.title}
        schema={{
          "@type": "CollectionPage",
          name: page.title,
          description: page.seo.metaDesc,
          url: `${siteUrl}/blog`,
          isPartOf: { "@id": `${siteUrl}/#website` },
        }}
      />
      <PageHeader title={page.title} description={page.seo.metaDesc} />
      <AllPosts filter />
      <Newsletter />
    </Layout>
  );
};

export default BlogPage;

export const pageQuery = graphql`
  query ($id: String!) {
    wpPage(id: { eq: $id }) {
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
