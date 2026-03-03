import "../../components/GutenbergBlocks/FAQ/style.scss"; // Import Gutenberg styles

import FAQ from "../../components/GutenbergBlocks/FAQ/Faq";
import Layout from "../../components/Layout";
import PostHeader from "../../components/PostHeader/PostHeader";
import React from "react";
import RelatedPosts from "../../components/RelatedPosts/RelatedPosts";
import Seo from "../../components/Seo";
import SpotifyEmbed from "../../components/SpotifyEmbed/SpotifyEmbed";
import TOCBlock from "../../components/TOCBlock/TOCBlock";
import YoutubeEmbed from "../../components/YoutubeEmbed/YoutubeEmbed";
import { graphql } from "gatsby";
import parse, { DOMNode, Element, Text } from "html-react-parser";

const Post = ({ data }) => {
  const post = data.wpPost;
  const blocks = post.blocks || [];
  const categorySlug = post.categories?.nodes?.[0]?.slug || "uncategorized";

  const parseOptions = {
    replace: (domNode: DOMNode) => {
      // Keep support for standard iframes
      if (
        domNode instanceof Element &&
        domNode.name === "iframe" &&
        domNode.attribs &&
        domNode.attribs.src &&
        domNode.attribs.src.includes("youtube.com")
      ) {
        return <YoutubeEmbed url={domNode.attribs.src} />;
      }

      // Support for Gutenberg oEmbed <figure> block
      if (
        domNode instanceof Element &&
        domNode.name === "figure" &&
        domNode.attribs &&
        domNode.attribs.class
      ) {
        const isYoutube = domNode.attribs.class.includes("wp-block-embed-youtube") || domNode.attribs.class.includes("is-provider-youtube");
        const isSpotify = domNode.attribs.class.includes("wp-block-embed-spotify") || domNode.attribs.class.includes("is-provider-spotify");

        if (isYoutube || isSpotify) {
          const wrapperDiv = domNode.children.find(
            (child) =>
              child instanceof Element &&
              child.name === "div" &&
              child.attribs?.class?.includes("wp-block-embed__wrapper")
          ) as Element | undefined;

          if (wrapperDiv && wrapperDiv.children) {
            const textNode = wrapperDiv.children.find(
              (child) => child instanceof Text
            ) as Text | undefined;

            if (textNode && textNode.data) {
              const url = textNode.data.trim();
              if (url) {
                if (isYoutube) return <YoutubeEmbed url={url} />;
                if (isSpotify) return <SpotifyEmbed url={url} />;
              }
            }
          }
        }
      }
    },
  };

  const renderBlocks = () => {
    return blocks.map((block, index) => {
      switch (block.name) {
        case "faq-block-for-gutenberg/faq":
          return <FAQ key={index} content={block.saveContent} />;
        case "tm-multi-block/toc":
          return <TOCBlock attributes={block.attributes} />;
        case "core/embed":
          // WordPress oEmbed block (YouTube)
          return <div key={index}>{parse(block.saveContent, parseOptions)}</div>;
        default:
          return (
            <div
              key={index}
            >
              {parse(block.saveContent, parseOptions)}
            </div>
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
