import { graphql, useStaticQuery } from "gatsby";
export const useSiteMenu = () => {
  const data = useStaticQuery(graphql`
    query GET_MENU_ITEMS {
      allWpMenuItem {
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
            }
          }
        }
      }
    }
  `);
  return data.allWpMenuItem.nodes;
};
