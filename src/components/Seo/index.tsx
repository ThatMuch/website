import { graphql, useStaticQuery } from "gatsby";

import { Helmet } from "react-helmet";
import React from "react";
import { useSiteSeo } from "../../hooks/use-site-seo";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
  pathname?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image,
  article = false,
  pathname,
}) => {
  const site = useSiteSeo();
  console.log(site);

  const {
    defaultTitle,
    defaultDescription,
    siteUrl,
    defaultImage,
    twitterUsername,
  } = site;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname || ``}`,
  };

  return (
    <Helmet title={seo.title}>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />

      {/* OpenGraph tags */}
      <meta property="og:url" content={seo.url} />
      {article ? <meta property="og:type" content="article" /> : null}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      {twitterUsername ? (
        <meta name="twitter:creator" content={twitterUsername} />
      ) : null}
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
    </Helmet>
  );
};

export default SEO;
