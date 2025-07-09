import { graphql, useStaticQuery } from "gatsby";
export const useSiteMenu = (location?: string) => {
  const data = useStaticQuery(graphql`
    query GET_MENU_ITEMS {
      allWpMenu {
        edges {
          node {
            locations
            menuItems {
              nodes {
                id
                path
                label
                url
                target
                description
                locations
                parentId
                childItems {
                  nodes {
                    url
                    label
                    target
                  }
                }
              }
            }
          }
        }
      }
    }
  `);
  let menuItems = data.allWpMenu.edges
    .map((edge) => edge.node.menuItems.nodes)
    .flat();
  if (location) {
    menuItems = menuItems.filter((item) => item.locations.includes(location));
  }
  return menuItems;
};
