const path = require(`path`)
const { slash } = require(`gatsby-core-utils`)
exports.createPages = async ({ graphql,actions }) => {
	const { createPage } = actions
	const menuItems = await graphql(`
 query GET_MENU_ITEMS{
     allWpMenuItem {
      nodes {
        path
        label
      }
    }
  }
`)
console.log(menuItems);
	// query content for WordPress posts
	const posts = await graphql(`
    query GET_POSTS{
      allWpPost {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `)
	const pages = await graphql(`
    query GET_PAGES{
      allWpPage{
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `)
	const menu = await graphql(`
    query GET_MENU{
       allWpMenuItem(filter: { locations: { eq: MAINMENU } }) {
    nodes {
      id
      label
      title
      path
      parentId
    }
  }
    }
  `)

  console.log(menu);

	const postTemplate = path.resolve(`./src/templates/Post/index.tsx`)
	const pageTemplate = path.resolve(`./src/templates/Page/index.tsx`)
	pages.data.allWpPage.edges.forEach(edge => {
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
		})
	})
	posts.data.allWpPost.edges.forEach(edge => {
		createPage({
			// `path` will be the url for the page
			path: edge.node.slug,
			// specify the component template of your choice
			component: slash(postTemplate),
			// In the ^template's GraphQL query, 'id' will be available
			// as a GraphQL variable to query for this posts's data.
			context: {
				id: edge.node.id,
			},
		})
	})
}