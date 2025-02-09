import { graphql, useStaticQuery } from "gatsby"
export const useSitePages = () => {
  const data = useStaticQuery(graphql`
    query GET_ALL_PAGES{
      allWpPage {
        edges {
          node {
            id
            link
            title
          }
        }
      }
    }
  `)
  return data.allWpPage.edges
}