import Layout from "../../components/Layout";
import PostHeader from "../../components/PostHeader/PostHeader";
//import Layout from "../../components/Layout"
import PropTypes from "prop-types";
import React from "react";
import RelatedPosts from "../../components/RelatedPosts/RelatedPosts";
import Seo from "../../components/Seo";
import { graphql } from "gatsby";

const Post = ({ data }) => {
  const post = data.wpPost;

  return (
    <Layout type="post">
      <main>
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
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        <RelatedPosts
          category={post.categories.nodes[0].slug}
          currentPostId={post.id}
        />
      </main>
    </Layout>
  );
};

Post.propTypes = {
  data: PropTypes.object.isRequired,
  edges: PropTypes.array,
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
        metaKeywords
        title
      }
      date(formatString: "d/MM/YYYY")
      author {
        node {
          name
          avatar {
            url
            size
          }
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
    }
  }
`;
