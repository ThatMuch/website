import { PageProps, graphql } from "gatsby";

import AllPosts from "../../components/AllPosts/AllPosts";
import BlogCategoryFilter from "../../components/BlogCategoryFilter/BlogCategoryFilter";
import Layout from "../../components/Layout";
import Newsletter from "../../components/Newsletter";
import PageHeader from "../../components/PageHeader";
import React from "react";
import Seo from "../../components/Seo";
import { useSitePosts } from "../../hooks/use-site-posts";

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
  const posts = useSitePosts();
  return (
    <Layout type="blog">
      <Seo
        title={page.title}
        description={page.seo.metaDesc}
        image={page?.featuredImage?.node?.mediaItemUrl}
      />
      <PageHeader title={page.title} description={page.seo.metaDesc} />
      <AllPosts posts={posts} />
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
