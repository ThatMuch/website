import { PageProps, graphql } from "gatsby";

import BlogCategoryFilter from "../../components/BlogCategoryFilter/BlogCategoryFilter";
import Layout from "../../components/Layout";
import Newsletter from "../../components/Newsletter";
import PageHeader from "../../components/PageHeader";
import React from "react";
import Seo from "../../components/Seo";

interface BlogPageProps extends PageProps {
  data: {
    wpPage: {
      title: string;
      seo: {
        metaDesc: string;
      };
    };
  };
}

const BlogPage: React.FC<BlogPageProps> = ({ data }) => {
  const page = data.wpPage;
  return (
    <Layout type="blog">
      <Seo title={page.title} description={page.seo.metaDesc} />
      <PageHeader title={page.title} description={page.seo.metaDesc} />
      <BlogCategoryFilter />
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
      seo {
        metaDesc
        metaKeywords
        title
      }
    }
  }
`;
