import "../../components/GutenbergBlocks/FAQ/style.scss"; // Import Gutenberg styles

import FAQ from "../../components/GutenbergBlocks/FAQ/Faq";
import Layout from "../../components/Layout";
import PostHeader from "../../components/PostHeader/PostHeader";
import React from "react";
import RelatedPosts from "../../components/RelatedPosts/RelatedPosts";
import Seo from "../../components/Seo";
import TOCBlock from "../../components/TOCBlock/TOCBlock";
import { graphql } from "gatsby";

const Post = ({ data }) => {
  const post = data.wpPost;
  const blocks = post.blocks || [];
  const categorySlug = post.categories?.nodes?.[0]?.slug || "uncategorized";

  const renderBlocks = () => {
    return blocks.map((block, index) => {
      switch (block.name) {
        case "faq-block-for-gutenberg/faq":
          return <FAQ key={index} content={block.saveContent} />;
        case "tm-multi-block/toc":
          return <TOCBlock attributes={block.attributes} />;
        default:
          return (
            <div
              key={index}
              dangerouslySetInnerHTML={{ __html: block.saveContent }}
            />
          );
      }
    });
  };
  return (
    <Layout type="post">
      <div className={categorySlug}>
        <Seo
          title={post.title}
          description={post.seo.metaDesc}
          image={post.featuredImage?.node?.mediaItemUrl}
          type="article"
        />

        <PostHeader
          title={post.title}
          author={post.author.node}
          category={categorySlug}
          postDate={post.date}
        />
        <div className="post__content">{renderBlocks()}</div>
        <RelatedPosts category={categorySlug} currentPostId={post.id} />
      </div>
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
        ... on WpTmMultiBlockTocBlock {
          attributes {
            collapsible
            includeH6
            includeH5
            includeH4
            includeH3
            includeH2
            includeH1
            title
          }
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
