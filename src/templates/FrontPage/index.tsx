import AllPosts from "../../components/AllPosts/AllPosts";
import HeroSection from "../../components/HeroSection";
import Layout from "../../components/Layout";
import React from "react";
import Seo from "../../components/Seo";
import { useSiteCustomPosts } from "../../hooks/use-custom-post";
const FrontPage = ({ data }) => {
  const {
    allWpTestimonial: { edges: testimonials },
  } = useSiteCustomPosts();

  console.log(testimonials);
  console.log(data);
  const { heroSection, pageBuilder } = data;
  return (
    <div>
      <Layout type="frontpage">
        <Seo />
        <HeroSection data={heroSection} />
        <AllPosts title="Le blog de l'équipage" isHome />
      </Layout>
    </div>
  );
};

export default FrontPage;
