require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    defaultTitle: `Thatmuch`,
    defaultDescription: `ThatMuch intervient dans la communication numérique & visuelle de votre entreprise. Nous vous accompagnons dans toutes les étapes de votre projet.`,
    author: `Thatmuch`,
    siteUrl: process.env.SITE_URL, // Replace with your domain
    defaultImage: `src/images/THATMUCH_Logo_Black.png`,
    defaultImageAlt: `THATMUCH Logo`,
    defaultImageWhite: `src/images/THATMUCH_Logo_White.png`,
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
        // acfOptions: {
        //   useACF: true,
        //   verboseOutput: true,
        //   excludedACFTypes: ["options"],
        //   onlyIncludedACFList: false,
        //   includedACFList: [],
        // },
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
        icon: `src/images/THATMUCH_Logo_Black.png`, // Path to your favicon
      },
    },
  ],
};
