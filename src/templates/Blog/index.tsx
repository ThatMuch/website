import { PageProps, graphql } from "gatsby";

import BlogCategoryFilter from "../../components/BlogCategoryFilter/BlogCategoryFilter";
import { GatsbyImage } from "gatsby-plugin-image";
import Layout from "../../components/Layout";
import React from "react";
import Seo from "../../components/Seo";
import { useSitePosts } from "../../hooks/use-site-posts";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  link: string;
  featured_media_item: {
    localFile: {
      childImageSharp: {
        gatsbyImageData: any; // Or a more specific type if you define it
      };
    };
  } | null; // Make featured_media_item nullable
}

const BlogPage: React.FC<PageProps> = () => {
  const posts = useSitePosts();
  return (
    <Layout>
      <main>
        <Seo title="Blog" />
        <h1>Blog</h1>
        <BlogCategoryFilter />
      </main>
    </Layout>
  );
};

export default BlogPage;
