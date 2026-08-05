import Layout from "../../components/Layout";
import PostContent from "../../components/PostContent";
import PostHeader from "../../components/PostHeader/PostHeader";
import React from "react";
import RelatedPosts from "../../components/RelatedPosts/RelatedPosts";
import Seo from "../../components/Seo";
import { graphql } from "gatsby";
import { useSiteSeo } from "../../hooks/use-site-seo";

const Post = ({ data, location = {} as { pathname?: string } }) => {
  const post = data.wpPost;
  const blocks = post.blocks || [];
  const categorySlug = post.categories?.nodes?.[0]?.slug || "uncategorized";
  const { siteUrl } = useSiteSeo();
  const authorId = `${siteUrl}/#/schema/person/${post.author.node.slug}`;

  return (
    <Layout type="post" shareTitle={post.title}>
      <div className={categorySlug}>
        <Seo
          title={post.title}
          description={post.seo.metaDesc}
          image={post.featuredImage?.node?.mediaItemUrl}
          type="article"
          pathname={location.pathname}
          breadcrumbs={[{ pathname: "/blog", label: "Blog" }]}
          currentPage={post.title}
          schema={[
            {
              "@type": "Person",
              "@id": authorId,
              name: post.author.node.name,
              image: post.author.node.avatar?.url,
            },
            {
              "@type": "BlogPosting",
              headline: post.title,
              image: post.featuredImage?.node?.mediaItemUrl
                ? [post.featuredImage.node.mediaItemUrl]
                : undefined,
              datePublished: post.dateISO,
              dateModified: post.dateModifiedISO || post.dateISO,
              author: { "@id": authorId },
            },
          ]}
        />

        <PostHeader
          title={post.title}
          author={post.author.node}
          category={categorySlug}
          postDate={post.date}
        />
        <PostContent blocks={blocks} />
        <RelatedPosts category={categorySlug} currentPostId={post.id} />
      </div>
    </Layout>
  );
};

export default Post;

export const Head = ({ data }) => {
  const blocks = data?.wpPost?.blocks || [];

  const faqBlocks = blocks.filter(
    (block) => block.name === "faq-block-for-gutenberg/faq",
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
    <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
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
      dateISO: date(formatString: "YYYY-MM-DDTHH:mm:ssZ")
      dateModifiedISO: modifiedGmt(formatString: "YYYY-MM-DDTHH:mm:ssZ")
      author {
        node {
          name
          slug
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
