import Layout from "../../components/Layout";
import PostHeader from "../../components/PostHeader/PostHeader";
//import Layout from "../../components/Layout"
import PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";

const Post = ({ data }) => {
  const post = data.wpPost;
  return (
    <Layout type="post">
      <main>
        <PostHeader
          title={post.title}
          author={post.author.node}
          category={post.categories.nodes[0].slug}
          postDate={post.date}
        />
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
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
      title
      content
      date(formatString: "D/MM/YYYY")
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
