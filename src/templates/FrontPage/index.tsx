import HeroSection from "../../components/HeroSection";
import Layout from "../../components/Layout";
import React from "react";
import Seo from "../../components/Seo";

const FrontPage = ({ data }) => {
  console.log(data);
  return (
    <div>
      <Layout type="frontpage">
        <Seo />
        <HeroSection data={data.heroSection} />
      </Layout>
    </div>
  );
};

export default FrontPage;
