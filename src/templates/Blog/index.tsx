import { PageProps, graphql } from "gatsby";

import { GatsbyImage } from "gatsby-plugin-image";
import Layout from "../../components/Layout";
import React from "react";
import Seo from "../../components/SEO";
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
  console.log(posts);
  return (
    <Layout>
      <Seo title="Blog" />
      <h1>Blog</h1>
      {posts.map((post: any) => {
        const { node } = post; // Destructure the node property
        const { title, link, id } = node;
        return (
          <article key={id}>
            <h2>{title}</h2>
            {/* {post.featured_media_item && ( // Check if it exists
            <GatsbyImage
              image={
                post.featured_media_item.localFile.childImageSharp
                  .gatsbyImageData
              }
              alt={post.title}
            />
          )} */}
            {/* <div dangerouslySetInnerHTML={{ __html: post.excerpt }} /> */}
            <a href={link}>Read More</a>
          </article>
        );
      })}
    </Layout>
  );
};

export default BlogPage;
