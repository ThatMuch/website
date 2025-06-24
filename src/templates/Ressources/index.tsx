import AllPosts from "../../components/AllPosts/AllPosts";
import Layout from "../../components/Layout";
import PostHeader from "../../components/PostHeader/PostHeader";
import PropTypes from "prop-types";
import React from "react";
import Seo from "../../components/Seo";
import { graphql } from "gatsby";

const Ressources = ({ data }) => {
  const post = data?.wpPost;
  return (
    <Layout>
      {/* <Seo
        title={post.title}
        description={post.seo.metaDesc}
        image={post.featuredImage.node.mediaItemUrl}
      /> */}
      <AllPosts title="Le blog de l'équipage" isHome />
    </Layout>
  );
};

export default Ressources;

// export const pageQuery = graphql`
//   query ($id: String!) {
//     wpRessource(id: { eq: $id }) {
//       id
//       title
//       content
//       featuredImage {
//         node {
//           mediaItemUrl
//         }
//       }
//       seo {
//         metaDesc
//         metaKeywords
//         title
//       }
//       date(formatString: "d/MM/YYYY")
//       author {
//         node {
//           name
//           avatar {
//             url
//             size
//           }
//         }
//       }
//       categories {
//         nodes {
//           name
//           slug
//         }
//       }
//     }
//   }
// `;
