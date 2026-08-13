require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  siteMetadata: {
    defaultTitle: `THATMUCH : Agence web de design et développement front pour les sites WordPress et SaaS.`,
    defaultDescription: `Agence web experte en design et développement front sur WordPress et SaaS. Créons ensemble un site performant, moderne et sur-mesure.`,
    author: `THATMUCH`,
    siteUrl: process.env.SITE_URL, // Replace with your domain
    defaultImage: `/og_image_THATMUCH.png`,
    defaultImageAlt: `THATMUCH Logo`,
    defaultImageWhite: `/THATMUCH_Logo_White.png`,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `
        {
          allSitePage {
            nodes {
              path
            }
          }
          allWpContentNode(filter: {nodeType: {in: ["Post", "Page", "Expertise", "Template"]}}) {
            nodes {
              ... on WpPost {
                uri
                modifiedGmt
              }
              ... on WpPage {
                uri
                modifiedGmt
              }
              ... on WpExpertise {
                uri
                modifiedGmt
              }
              ... on WpTemplate {
                uri
                modifiedGmt
                slug
              }
            }
          }
        }
      `,
        resolveSiteUrl: () => process.env.SITE_URL,
        resolvePages: ({
          allSitePage: { nodes: allPages },
          allWpContentNode: { nodes: allWpNodes },
        }) => {
          // Gatsby's page.path is always trailing-slash-normalized, but
          // WPGraphQL's uri field isn't guaranteed to be — normalize both
          // sides before joining, or lastmod silently fails to match.
          const withTrailingSlash = (uri) =>
            uri.endsWith("/") ? uri : `${uri}/`;

          const wpNodeMap = allWpNodes.reduce((acc, node) => {
            if (!node.uri) return acc;
            acc[withTrailingSlash(node.uri)] = node;

            return acc;
          }, {});

          // Individual templates are served at /ressources/templates/{slug}/,
          // a frontend-only path that doesn't match their native WPGraphQL
          // uri — fall back to a slug match for that one content type.
          const templateBySlug = allWpNodes.reduce((acc, node) => {
            if (node.slug) acc[node.slug] = node;

            return acc;
          }, {});

          return allPages.map((page) => {
            const templateSlugMatch = page.path.match(
              /^\/ressources\/templates\/([^/]+)\/$/,
            );
            const fallback = templateSlugMatch
              ? templateBySlug[templateSlugMatch[1]]
              : undefined;

            return { ...page, ...(wpNodeMap[page.path] || fallback) };
          });
        },
        serialize: ({ path, modifiedGmt }) => {
          return {
            url: path,
            lastmod: modifiedGmt,
          };
        },
      },
    },
    `gatsby-plugin-robots-txt`,
	  `gatsby-plugin-react-helmet`,
    // NB: pas de configuration a ajouter pour /audit-refonte/. La NavigationRoute
    // de ce plugin (sw-append.js) retombe sur fetch() des qu'un chemin n'a pas
    // d'entree "resources:" en IndexedDB, ce qui est le cas de l'outil d'audit :
    // il est servi directement par Apache, sans interception.
    `gatsby-plugin-offline`,
    {
      resolve: "gatsby-source-wordpress",
      options: {
        url: process.env.WPGRAPHQL_URL,
        type: {
          MediaItem: {
            createFileNodes: true,
          },
          CoreVideoBlockDeprecatedV1Attributes: {
            exclude: true,
          },
          Comment: {
            limit: 0,
          }
        },
        debug: {
          graphql: {
            showQueryVarsOnError: true,
            copyQueryOnError: true,
            panicOnError: true,
          },
        },
        schema: {
          //Prefixes all WP Types with "Wp" so "Post and allPost" become "WpPost and allWpPost".
          typePrefix: `Wp`,
          timeout: 300000, // Increased to 5 minutes
          perPage: 20, // Reduced from 50 to 20 items per request
          requestConcurrency: 2, // Lowered to avoid tripping Hostinger's hcdn bot protection
          previewRequestConcurrency: 2, // Limit preview requests
        },
        develop: {
          //caches media files outside of Gatsby's default cache an thus allows them to persist through a cache reset.
          hardCacheMediaFiles: true,
          nodeUpdateInterval: 5000, // Check for updates every 5 seconds
        },
        production: {
          hardCacheMediaFiles: true,
        },
        html: {
          useGatsbyImage: true,
          createStaticFiles: true,
        },
      },
    },
    {
      resolve: "gatsby-plugin-sass",
      options: {
        sassOptions: {
          silenceDeprecations: ["legacy-js-api"],
        },
      },
    },
    "gatsby-plugin-gatsby-cloud",
    "gatsby-plugin-image",
    `gatsby-transformer-remark`,
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon-32x32.png`, // Path to your favicon
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title: defaultTitle
                description: defaultDescription
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allWpPost } }) => {
              return allWpPost.nodes.map(node => {
                return {
                  title: node.title,
                  description: node.excerpt,
                  date: node.date,
                  url: site.siteMetadata.siteUrl + node.uri,
                  guid: site.siteMetadata.siteUrl + node.uri,
                  custom_elements: [{ "content:encoded": node.content }],
                }
              })
            },
            query: `
              {
                allWpPost(sort: { date: DESC }) {
                  nodes {
                    title
                    date
                    excerpt
                    uri
                    content
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "THATMUCH RSS Feed",
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-W2WV9WGR",
        includeInDevelopment: false,
        defaultDataLayer: { platform: "gatsby" },
        enableWebVitalsTracking: true,
      },
    },
  ],
};
