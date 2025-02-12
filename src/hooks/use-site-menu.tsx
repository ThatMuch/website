import { graphql, useStaticQuery } from "gatsby";
export const useSiteMenu = () => {
  const data = useStaticQuery(graphql`
    query GET_MENU_ITEMS {
      allWpMenuItem {
        nodes {
          path
          label
          url
          target
          description
        }
      }
    }
  `);
  return data.allWpMenuItem.nodes;
};
