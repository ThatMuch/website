import "../../components/GutenbergBlocks/FAQ/style.scss"; // Import Gutenberg styles

import FAQ from "../../components/GutenbergBlocks/FAQ/Faq";
import Layout from "../../components/Layout";
import PostHeader from "../../components/PostHeader/PostHeader";
import React from "react";
import RelatedPosts from "../../components/RelatedPosts/RelatedPosts";
import Seo from "../../components/Seo";
import { graphql } from "gatsby";

const Post = ({ data }) => {
  const post = data.wpPost;
  const blocks = post.blocks || [];
  const faqBlocks = blocks.filter(
    (block) =>
      block.name === "core/faq" || block.name === "faq-block-for-gutenberg/faq"
  );

  return (
    <Layout type="post">
      <main className={post.categories.nodes[0].slug}>
        <Seo
          title={post.title}
          description={post.seo.metaDesc}
          image={post.featuredImage.node.mediaItemUrl}
          type="article"
        />

        <PostHeader
          title={post.title}
          author={post.author.node}
          category={post.categories.nodes[0].slug}
          postDate={post.date}
        />
        {blocks.map((block, index) => {
          switch (block.name) {
            case "faq-block-for-gutenberg/faq":
              return <FAQ key={index} content={block.saveContent} />;
            default:
              return (
                <div
                  key={index}
                  dangerouslySetInnerHTML={{ __html: block.saveContent }}
                />
              );
          }
        })}
        <RelatedPosts
          category={post.categories.nodes[0].slug}
          currentPostId={post.id}
        />
      </main>
    </Layout>
  );
};

export default Post;
export const pageQuery = graphql`
  query ($id: String!) {
    wpPost(id: { eq: $id }) {
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
        title
      }
      date(formatString: "DD/MM/YYYY")
      author {
        node {
          name
          avatar {
            url
          }
        }
      }
      categories {
        nodes {
          slug
        }
      }
      blocks {
        ... on WpFaqBlockForGutenbergFaqBlock {
          attributesJSON
          saveContent
        }
        name
        saveContent
        innerBlocks {
          name
          saveContent
          attributesJSON
        }
      }
    }
  }
`;
