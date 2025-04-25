import AllPosts from "../../components/AllPosts/AllPosts";
import ExpertisesSection from "../../components/ExpertisesSection";
import HeroSection from "../../components/HeroSection";
import Layout from "../../components/Layout";
import React from "react";
import Seo from "../../components/Seo";
import Testimonials from "../../components/TestimonialsSection";
const FrontPage = ({ data }) => {
  console.log(data);
  const { heroSection, pageBuilder } = data;
  return (
    <div>
      <Layout type="frontpage">
        <Seo />
        <HeroSection data={heroSection} />
        {pageBuilder.map((section, index) => {
          switch (section.fieldGroupName) {
            case "HomePageBuilderTestimonialsLayout":
              return (
                <Testimonials
                  key={index}
                  title={section.titre}
                  description={section.desc}
                  subtitle={section.sousTitre}
                />
              );
            case "HomePageBuilderExpertisesLayout":
              return <ExpertisesSection key={section.id} section={section} />;
            default:
              return null;
          }
        })}
        <AllPosts title="Le blog de l'équipage" isHome />
      </Layout>
    </div>
  );
};

export default FrontPage;
