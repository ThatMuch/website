const adapter = require("gatsby-adapter-netlify").default;

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
  adapter: adapter({
    // Options de configuration de l'adaptateur
    // excludeDatastoreFromEngineFunction: false, // Par défaut
    imageCDN: true,
    excludeDatastoreFromEngineFunction: true,
  }),
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
    `gatsby-plugin-react-helmet`,
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
          allWpContentNode(filter: {nodeType: {in: ["Post", "Page"]}}) {
            nodes {
              ... on WpPost {
                uri
                modifiedGmt
              }
              ... on WpPage {
                uri
                modifiedGmt
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
          const wpNodeMap = allWpNodes.reduce((acc, node) => {
            const { uri } = node;
            acc[uri] = node;

            return acc;
          }, {});

          return allPages.map((page) => {
            return { ...page, ...wpNodeMap[page.path] };
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
    `gatsby-plugin-offline`,
    {
      resolve: "gatsby-source-wordpress",
      options: {
        url: process.env.WPGRAPHQL_URL,
        type: {
          MediaItem: {
            createFileNodes: true,
          },
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
          timeout: 120000,
          // Decrease the number of items fetched per request (e.g., to 50)
          perPage: 50,
        },
        develop: {
          //caches media files outside of Gatsby's default cache an thus allows them to persist through a cache reset.
          hardCacheMediaFiles: true,
        },
      },
    },
    "gatsby-plugin-sass",
    "gatsby-plugin-gatsby-cloud",
    "gatsby-plugin-image",
    `gatsby-transformer-remark`,
    `gatsby-plugin-sharp`,
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-netlify",
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
    }
  ],
};
