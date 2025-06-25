import AllPosts from "../../components/AllPosts/AllPosts";
import AllTemplates from "../../components/AllTemplates/AllTemplates";
import Layout from "../../components/Layout";
import PostHeader from "../../components/PostHeader/PostHeader";
import PropTypes from "prop-types";
import React from "react";
import Seo from "../../components/Seo";
import { graphql } from "gatsby";

const Ressources = ({ data }) => {
  const page = data?.wpPage;

  return (
    <Layout>
      <Seo
        title={page?.title}
        description={page?.seo.metaDesc}
        image={page?.featuredImage?.node?.mediaItemUrl}
      />
      <h1>{page?.title}</h1>
      <AllPosts title="Le blog de l'équipage" isHome />
      <AllTemplates />
    </Layout>
  );
};

export default Ressources;

export const pageQuery = graphql`
  query ($id: String!) {
    wpPage(id: { eq: $id }) {
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
    }
  }
`;
