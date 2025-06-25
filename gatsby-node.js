const path = require(`path`);
const { slash } = require(`gatsby-core-utils`);
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
            hubspotForm {
              formId
              portalid
              titre
              fieldGroupName
            }
          }
        }
      }
    }`);

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
      }
    }`);

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
      }
    }
  `);

  const postTemplate = path.resolve(`./src/templates/Post/index.tsx`);
  const pageTemplate = path.resolve(`./src/templates/Page/index.tsx`);
  const blogTemplate = path.resolve(`./src/templates/Blog/index.tsx`);
  const contactTemplete = path.resolve(`./src/templates/Contact/index.tsx`);
  const podcastTemplate = path.resolve(`./src/templates/Podcast/index.tsx`);
	const expertiseTemplate = path.resolve(`./src/templates/Expertise/index.tsx`);
	const ressourcesTemplate = path.resolve(`./src/templates/Ressources/index.tsx`);
  pages.data.allWpPage.edges.forEach((edge) => {
    switch (true) {
      case edge.node.slug === "blog":
        createPage({
          path: "/blog",
          component: slash(blogTemplate),
          context: {
            id: edge.node.id,
          },
        });
        break;
      case edge.node.template.templateName === "Podcast":
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
		case edge.node.template.templateName === "Ressources":
		createPage({
      path: "/ressources",
      component: slash(ressourcesTemplate),
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
      path: `/ressources/template/${edge.node.slug}`,
      // specify the component template of your choice
      component: slash(pageTemplate),
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
			path :`/expertise/${edge.node.slug}`,
			// specify the component template of your choice
			component : slash(expertiseTemplate),
			// In the ^template's GraphQL query, 'id' will be available
			// as a GraphQL variable to query for this posts's data.
			context : {
				id : edge.node.id,
			},
		});
	}
	);
};
