const path = require(`path`);
const crypto = require(`crypto`);
const { slash } = require(`gatsby-core-utils`);

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
	  type WpBlockAttributesObject {
		foobar: String
	  }
    type SaswpCollectionBlock {
      saveContent: String
      clientId: String
    }
    type GoogleReview implements Node {
      authorName: String
      profilePhotoUrl: String
      rating: Int
      text: String
      relativeTimeDescription: String
      time: Int
    }
	`;
  createTypes(typeDefs);
};

// Fetches Google reviews for THATMUCH at build time via the Places API
// (Place Details, "reviews" field) and exposes them as GoogleReview nodes,
// queryable alongside the WordPress testimonials.
exports.sourceNodes = async ({ actions, createNodeId, reporter }) => {
  const { createNode } = actions;
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    reporter.warn(
      "GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID is not set, skipping Google reviews import."
    );
    return;
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`;

  let response;
  try {
    response = await fetch(url);
  } catch (error) {
    reporter.warn(`Failed to fetch Google reviews: ${error.message}`);
    return;
  }

  const { result, status, error_message } = await response.json();

  if (status !== "OK") {
    reporter.warn(
      `Google Places API returned status "${status}"${
        error_message ? `: ${error_message}` : ""
      }`
    );
    return;
  }

  const reviews = result?.reviews ?? [];

  reviews.forEach((review) => {
    const nodeContent = {
      authorName: review.author_name,
      profilePhotoUrl: review.profile_photo_url,
      rating: review.rating,
      text: review.text,
      relativeTimeDescription: review.relative_time_description,
      time: review.time,
    };

    createNode({
      ...nodeContent,
      id: createNodeId(`google-review-${review.time}-${review.author_name}`),
      parent: null,
      children: [],
      internal: {
        type: "GoogleReview",
        contentDigest: crypto
          .createHash("md5")
          .update(JSON.stringify(nodeContent))
          .digest("hex"),
      },
    });
  });
};
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // query content for WordPress posts
  const posts = await graphql(`
    query GET_POSTS {
      allWpPost {
        edges {
          node {
            id
            slug
            link
          }
        }
      }
    }
  `);
  const templates = await graphql(`
    query GET_TEMPLATES {
      allWpTemplate {
        edges {
          node {
            content
            id
            slug
            title
            featuredImage {
              node {
                altText
                mediaItemUrl
                title
              }
            }
            categories {
              nodes {
                name
                slug
              }
            }
          }
        }
      }
    }
  `);

  const expertises = await graphql(`
    query GET_EXPERTISES {
      allWpExpertise {
        edges {
          node {
            id
            slug
            title
            featuredImage {
              node {
                altText
                mediaItemUrl
              }
            }
            expertiseContent {
              service {
                desc
                titre
                image {
                  node {
                    altText
                    mediaItemUrl
                  }
                }
              }
              desc_exp
            }
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  `);

  const pages = await graphql(`
    query GET_PAGES {
      allWpPage {
        edges {
          node {
            id
            slug
            isFrontPage
            template {
              templateName
            }
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  `);

  const postTemplate = path.resolve(`./src/templates/Post/index.tsx`);
  const pageTemplate = path.resolve(`./src/templates/Page/index.tsx`);
  const blogTemplate = path.resolve(`./src/templates/Blog/index.tsx`);
  const contactTemplete = path.resolve(`./src/templates/Contact/index.tsx`);
  const podcastTemplate = path.resolve(`./src/templates/Podcast/index.tsx`);
  const expertiseTemplate = path.resolve(`./src/templates/Expertise/index.tsx`);
  const ressourcesTemplate = path.resolve(
    `./src/templates/Ressources/index.tsx`
  );
  const templateTemplate = path.resolve(`./src/templates/Template/index.tsx`);
  const templatesTemplate = path.resolve(`./src/templates/Templates/index.tsx`);
  pages.data.allWpPage.edges.forEach((edge) => {
    switch (true) {
      case edge.node.isFrontPage:
        break;
      case edge.node.slug === "blog":
        createPage({
          path: "/blog",
          component: slash(blogTemplate),
          context: {
            id: edge.node.id,
          },
        });
        break;
      case edge?.node?.template?.templateName === "Podcast":
        createPage({
          path: "/ipeach",
          component: slash(podcastTemplate),
          context: {
            id: edge.node.id,
          },
        });
        break;
      case edge.node.slug === "contact":
        createPage({
          path: "/contact",
          component: slash(contactTemplete),
          context: {
            id: edge.node.id,
          },
        });
        break;
      case edge?.node?.template?.templateName === "Ressources":
        createPage({
          path: "/ressources",
          component: slash(ressourcesTemplate),
          context: {
            id: edge.node.id,
          },
        });
        break;
      case edge.node.template.templateName === "Ressources/Templates":
        createPage({
          path: "/ressources/templates",
          component: slash(templatesTemplate),
          context: {
            id: edge.node.id,
          },
        });
        break;
      default:
        createPage({
          path: edge.node.slug,
          component: slash(pageTemplate),
          context: {
            id: edge.node.id,
          },
        });
        break;
    }
  });

  posts.data.allWpPost.edges.forEach((edge) => {
    createPage({
      // `path` will be the url for the page
      path: edge.node.link,
      // specify the component template of your choice
      component: slash(postTemplate),
      // In the ^template's GraphQL query, 'id' will be available
      // as a GraphQL variable to query for this posts's data.
      context: {
        id: edge.node.id,
      },
    });
  });

  templates.data.allWpTemplate.edges.forEach((edge) => {
    createPage({
      // `path` will be the url for the page
      path: `/ressources/templates/${edge.node.slug}`,
      // specify the component template of your choice
      component: slash(templateTemplate),
      // In the ^template's GraphQL query, 'id' will be available
      // as a GraphQL variable to query for this posts's data.
      context: {
        id: edge.node.id,
      },
    });
  });

  expertises.data.allWpExpertise.edges.forEach((edge) => {
    createPage({
      // `path` will be the url for the page
      path: `/expertise/${edge.node.slug}`,
      // specify the component template of your choice
      component: slash(expertiseTemplate),
      // In the ^template's GraphQL query, 'id' will be available
      // as a GraphQL variable to query for this posts's data.
      context: {
        id: edge.node.id,
      },
    });
  });
};
