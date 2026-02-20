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

export const Head = ({ data }) => {
  const blocks = data?.wpPost?.blocks || [];

  const faqBlocks = blocks.filter(
    (block) => block.name === "faq-block-for-gutenberg/faq"
  );

  let faqSchema = null;

  if (faqBlocks.length > 0) {
    const mainEntity = faqBlocks
      .map((block) => {
        try {
          const attributes = JSON.parse(block.attributesJSON || "{}");
          if (attributes.question && attributes.answer) {
            return {
              "@type": "Question",
              name: attributes.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: attributes.answer,
              },
            };
          }
        } catch (e) {
          console.error("Error parsing FAQ block attributes", e);
        }
        return null;
      })
      .filter(Boolean);

    if (mainEntity.length > 0) {
      faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity,
      };
    }
  }

  if (!faqSchema) return null;

  return (
    <script type="application/ld+json">
      {JSON.stringify(faqSchema)}
    </script>
  );
};

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
