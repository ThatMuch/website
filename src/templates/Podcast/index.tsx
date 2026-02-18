import React, { use } from "react";

import AllPosts from "../../components/AllPosts/AllPosts";
import ContactForm from "../../components/ContactForm";
import Layout from "../../components/Layout";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PodcastLinks from "../../components/PodcastLinks";
import Seo from "../../components/Seo";
import { graphql } from "gatsby";
import { useSitePosts } from "../../hooks/use-site-posts";

const Podcast = ({ data }) => {
  const page = data.wpPage;
  const { title, featuredImage, detailPagePodcast, hubspotForm } = page;
  const { descriptionHeroSection, sousTitre } = detailPagePodcast;
  const { mediaItemUrl, altText } = featuredImage.node;
  const posts = useSitePosts("podcast");

  return (
    <Layout type="podcast">
      <Seo title={title} description={page.seo.metaDesc} />
      <div className="row mb-5">
        <div className="col-md-6 order-2 order-md-1">
          <h2 className="h3">{sousTitre}</h2>
          <div className="divider mb-4"></div>
          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: descriptionHeroSection }} />
        </div>
        <div className="col-md-6 order-1 order-md-2">
          <LazyLoadImage src={mediaItemUrl} alt={altText} className="mb-4" />
        </div>
      </div>
      <PodcastLinks />
      <AllPosts title="Les épisodes" category="podcast" />
      <ContactForm hubspotForm={hubspotForm} />
    </Layout>
  );
};

export default Podcast;

export const pageQuery = graphql`
  query ($id: String!) {
    wpPage(id: { eq: $id }) {
      content
      hubspotForm {
        formId
        portalid
        sousTitre
        titre
      }
      title
      featuredImage {
        node {
          altText
          mediaItemUrl
        }
      }
      detailPagePodcast {
        descriptionHeroSection
        sousTitre
      }
      seo {
        metaDesc
        metaKeywords
        title
      }
    }
  }
`;
