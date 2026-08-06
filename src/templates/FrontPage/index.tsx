import AllPosts from "../../components/AllPosts/AllPosts";
import ContactCTA from "../../components/ContactCTA/ContactCTA";
import ExpertisesSection from "../../components/ExpertisesSection";
import FAQHome from "../../components/FAQHome/FAQHome";
import Features from "../../components/Features/Features";
import HeroSection from "../../components/HeroSection";
import Layout from "../../components/Layout";
import Metrics from "../../components/Metrics/Metrics";
import PortfolioSection from "../../components/PortfolioSection/PortfolioSection";
import React from "react";
import Seo from "../../components/Seo";
import Testimonials from "../../components/TestimonialsSection";
import { useSiteCustomPosts } from "../../hooks/use-custom-testimonial";
import { useSiteSeo } from "../../hooks/use-site-seo";

const FrontPage = ({ data }) => {
  const { heroSection, pageBuilder } = data;
  const { siteUrl } = useSiteSeo();
  const { allGoogleReview, googlePlaceRating } = useSiteCustomPosts();

  // Seuls les avis Google (tiers vérifié) sont balisés en Review : les
  // témoignages saisis dans WordPress sont sélectionnés par l'agence et ne
  // répondent pas aux critères de Google sur les avis indépendants.
  const reviewSchemas = (allGoogleReview?.edges ?? []).map(({ node }) => ({
    "@type": "Review",
    itemReviewed: { "@id": `${siteUrl}/#organization` },
    author: { "@type": "Person", name: node.authorName },
    reviewBody: node.text,
    reviewRating: {
      "@type": "Rating",
      ratingValue: node.rating,
      bestRating: 5,
      worstRating: 1,
    },
  }));

  return (
    <Layout type="frontpage">
      <Seo
        pathname="/"
        schema={reviewSchemas}
        aggregateRating={
          googlePlaceRating?.rating
            ? {
                ratingValue: googlePlaceRating.rating,
                ratingCount: googlePlaceRating.userRatingsTotal,
              }
            : undefined
        }
      />
      <HeroSection data={heroSection} />
      <div className="container">
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
          case "HomePageBuilderAboutLayout":
            return (
              <div key={`${section.fieldGroupName}-${index}`}>
                <Metrics
                  metric={section.metric}
                  title={section.title}
                  sousTitre={section.sousTitre}
                  description={section.description}
                />
              </div>
            );
          case "HomePageBuilderFeaturesLayout":
            return (
              <div key={`${section.fieldGroupName}-${index}`}>
                <Features
                  title={section.title}
                  subtitle={section.sousTitre}
                  features={section.feature}
                />
              </div>
            );
          default:
            return null;
        }
      })}
      <AllPosts title="Le blog de l'équipage" isHome />
      <ContactCTA />
      </div>
    </Layout>
  );
};

export default FrontPage;
