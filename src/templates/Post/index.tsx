import Layout from "../../components/Layout";
import PostContent from "../../components/PostContent";
import PostHeader from "../../components/PostHeader/PostHeader";
import React from "react";
import RelatedPosts from "../../components/RelatedPosts/RelatedPosts";
import Seo from "../../components/Seo";
import { graphql } from "gatsby";
import { useSiteSeo } from "../../hooks/use-site-seo";

// Yoast stores social profile URLs as free text; some are missing a protocol
// (e.g. "www.linkedin.com/in/...") which would make them invalid absolute
// URLs in JSON-LD.
const withProtocol = (url?: string | null) =>
  url && !/^https?:\/\//i.test(url) ? `https://${url}` : url;

const Post = ({ data, location = {} as { pathname?: string } }) => {
  const post = data.wpPost;
  const blocks = post.blocks || [];
  const categorySlug = post.categories?.nodes?.[0]?.slug || "uncategorized";
  const { siteUrl } = useSiteSeo();
  const authorId = `${siteUrl}/#/schema/person/${post.author.node.slug}`;
  const authorLinkedIn = withProtocol(post.author.node.seo?.social?.linkedIn);
  // Only surface "mis à jour le" when it's a real edit made after publication.
  // For scheduled posts, modifiedGmt can predate date (last saved as a draft
  // before the scheduled publish time) — a plain string/date inequality would
  // wrongly read that as an update.
  const wasUpdated =
    post.date !== post.dateModifiedDisplay &&
    new Date(post.dateModifiedISO) > new Date(post.dateISO);

  // Podcast episodes are plain WpPost entries in the "podcast" category —
  // give them PodcastEpisode + partOfSeries instead of a generic BlogPosting
  // so they're correctly linked to the PodcastSeries node on /ipeach/.
  const isPodcastEpisode = categorySlug === "podcast";
  const articleSchema = isPodcastEpisode
    ? {
        "@type": "PodcastEpisode",
        name: post.title,
        url: `${siteUrl}${location.pathname || ""}`,
        image: post.featuredImage?.node?.mediaItemUrl
          ? [post.featuredImage.node.mediaItemUrl]
          : undefined,
        datePublished: post.dateISO,
        dateModified: post.dateModifiedISO || post.dateISO,
        author: { "@id": authorId },
        partOfSeries: { "@id": `${siteUrl}/ipeach/#podcastseries` },
      }
    : {
        "@type": "BlogPosting",
        headline: post.title,
        image: post.featuredImage?.node?.mediaItemUrl
          ? [post.featuredImage.node.mediaItemUrl]
          : undefined,
        datePublished: post.dateISO,
        dateModified: post.dateModifiedISO || post.dateISO,
        author: { "@id": authorId },
      };

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
              sameAs: authorLinkedIn ? [authorLinkedIn] : undefined,
            },
            articleSchema,
          ]}
        />

        <PostHeader
          title={post.title}
          author={post.author.node}
          category={categorySlug}
          postDate={post.date}
          dateISO={post.dateISO}
          dateModified={wasUpdated ? post.dateModifiedDisplay : undefined}
          dateModifiedISO={wasUpdated ? post.dateModifiedISO : undefined}
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
      dateModifiedDisplay: modifiedGmt(formatString: "DD/MM/YYYY")
      dateModifiedISO: modifiedGmt(formatString: "YYYY-MM-DDTHH:mm:ssZ")
      author {
        node {
          name
          slug
          avatar {
            url
          }
          seo {
            social {
              linkedIn
            }
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
