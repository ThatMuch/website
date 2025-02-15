const path = require(`path`);
const { slash } = require(`gatsby-core-utils`);

import { useSitePages } from './src/hooks/use-site-pages'
import { useSitePosts } from './src/hooks/use-site-posts'
exports.createPages = async ({ actions }) => {
  const { createPage } = actions;


  // query content for WordPress posts
  const posts = await useSitePosts()
  const pages = await useSitePages()


  const postTemplate = path.resolve(`./src/templates/Post/index.tsx`);
  const pageTemplate = path.resolve(`./src/templates/Page/index.tsx`);
  const blogTemplate = path.resolve(`./src/templates/Blog/index.tsx`);

  pages.data.allWpPage.edges.forEach((edge) => {
    // if is posts page, use the index template
    if (edge.node.slug === "blog") {
      createPage({
        path: "/blog",
		  component: slash(blogTemplate),
		  context: {
			  id: edge.node.id,
		}
      });
    } else {
      createPage({
        // `path` will be the url for the page
        path: edge.node.slug,
        // specify the component template of your choice
        component: slash(pageTemplate),
        // In the ^template's GraphQL query, 'id' will be available
        // as a GraphQL variable to query for this posts's data.
        context: {
          id: edge.node.id,
        },
      });
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
};
