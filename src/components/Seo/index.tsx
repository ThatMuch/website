import { Helmet } from "react-helmet";
import React from "react";
import { useSiteSeo } from "../../hooks/use-site-seo";

export interface Crumb {
  pathname: string;
  label: string;
}

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  pathname?: string;
  breadcrumbs?: Crumb[];
  currentPage?: string;
  schema?: Record<string, unknown> | Record<string, unknown>[];
}

// Social profiles surfaced in the footer, mirrored here for the Organization schema's sameAs.
const SOCIAL_LINKS = [
  "https://www.instagram.com/thatmuch/",
  "https://www.tiktok.com/@ipeach_tv",
  "https://www.linkedin.com/company/thatmuch/",
  "https://open.spotify.com/show/5WyDmb1QFI1BmryUE0f8Y4",
  "https://www.youtube.com/@ipeach_tv",
  "https://bsky.app/profile/thatmuch.fr",
];

const Seo: React.FC<SEOProps> = ({
  title,
  description,
  image,
  type = "website",
  pathname,
  breadcrumbs = [],
  currentPage,
  schema,
}) => {
  const site = useSiteSeo();

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

  const organizationId = `${siteUrl}/#organization`;

  const organizationSchema = {
    "@type": "Organization",
    "@id": organizationId,
    name: "THATMUCH",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/icon-512x512.png`,
    },
    sameAs: SOCIAL_LINKS,
  };

  const websiteSchema = {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: defaultTitle,
    inLanguage: "fr-FR",
    publisher: { "@id": organizationId },
  };

  const graph: Record<string, unknown>[] = [organizationSchema, websiteSchema];

  // Skip on the homepage: a single-item trail there isn't meaningful breadcrumb data.
  if (pathname && pathname !== "/") {
    const items = [
      { name: "Accueil", item: siteUrl },
      ...breadcrumbs.map((crumb) => ({
        name: crumb.label,
        item: `${siteUrl}${crumb.pathname}`,
      })),
      { name: currentPage || seo.title, item: seo.url },
    ];

    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.item,
      })),
    });
  }

  const extraSchemas = schema ? (Array.isArray(schema) ? schema : [schema]) : [];
  extraSchemas.forEach((node) => {
    graph.push({
      publisher: { "@id": organizationId },
      mainEntityOfPage: { "@type": "WebPage", "@id": seo.url },
      url: seo.url,
      ...node,
    });
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <Helmet
      title={title}
      titleTemplate="%s | THATMUCH"
      defaultTitle={defaultTitle}
    >
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <html lang="fr" />
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <link rel="canonical" href={seo.url} />

      {/* OpenGraph tags */}
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content={type} />
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

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
};

export default Seo;
