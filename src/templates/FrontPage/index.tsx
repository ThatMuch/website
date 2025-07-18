import AllPosts from "../../components/AllPosts/AllPosts";
import ContactCTA from "../../components/ContactCTA/ContactCTA";
import ExpertisesSection from "../../components/ExpertisesSection";
import FAQHome from "../../components/FAQHome/FAQHome";
import HeroSection from "../../components/HeroSection";
import Layout from "../../components/Layout";
import PortfolioSection from "../../components/PortfolioSection/PortfolioSection";
import React from "react";
import Seo from "../../components/Seo";
import Testimonials from "../../components/TestimonialsSection";
const FrontPage = ({ data }) => {
  const { heroSection, pageBuilder } = data;
  return (
    <Layout type="frontpage">
      <Seo />
      <HeroSection data={heroSection} />
      {pageBuilder.map((section, index) => {
        switch (section?.fieldGroupName) {
          case "HomePageBuilderTestimonialsLayout":
            return (
              <div key={`${section.fieldGroupName}-${index}`}>
                <Testimonials
                  title={section.titre}
                  description={section.desc}
                  subtitle={section.sousTitre}
                />
              </div>
            );
          case "HomePageBuilderExpertisesLayout":
            return (
              <div key={`${section.fieldGroupName}-${index}`}>
                <ExpertisesSection section={section} />
              </div>
            );
          case "HomePageBuilderPortfolioLayout":
            return (
              <div key={`${section.fieldGroupName}-${index}`}>
                <PortfolioSection section={section} />
              </div>
            );
          case "HomePageBuilderFaqLayout":
            return (
              <div key={`${section.fieldGroupName}-${index}`}>
                <FAQHome
                  title={section.title}
                  description={section.description}
                  questions={section.questions}
                />
              </div>
            );
          default:
            return null;
        }
      })}
      <AllPosts title="Le blog de l'équipage" isHome />
      <ContactCTA />
    </Layout>
  );
};

export default FrontPage;
