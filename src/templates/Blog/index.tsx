import BlogCategoryFilter from "../../components/BlogCategoryFilter/BlogCategoryFilter";
import Layout from "../../components/Layout";
import PageHeader from "../../components/PageHeader";
import PropTypes from "prop-types";
import React from "react";
import Seo from "../../components/Seo";
import { graphql } from "gatsby";

const BlogPage = ({ data }) => {
  const page = data.wpPage;
  return (
    <Layout>
      <Seo title={page.title} description={page.seo.metaDesc} />
      <PageHeader title={page.title} description={page.seo.metaDesc} />
      <BlogCategoryFilter />
    </Layout>
  );
};

BlogPage.propTypes = {
  data: PropTypes.object.isRequired,
  edges: PropTypes.array,
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
