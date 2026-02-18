import { graphql, useStaticQuery } from "gatsby";
import { useMemo } from "react";

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

  const menuItems = useMemo(() => {
    let items = data.allWpMenu.edges
      .map((edge) => edge.node.menuItems.nodes)
      .flat();
    if (location) {
      items = items.filter((item) => item.locations.includes(location));
    }
    return items;
  }, [data, location]);

  return menuItems;
};
