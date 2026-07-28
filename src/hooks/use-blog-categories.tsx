import { graphql, useStaticQuery } from "gatsby";

export const useBlogCategories = (parentSlug?: string) => {
  const data = useStaticQuery(graphql`
    query GET_CATEGORIES {
      allWpCategory(filter: { name: { nin: ["Uncategorized"] } }) {
        nodes {
          name
          slug
          count
          link
          categoryId
          parentDatabaseId
          posts {
            nodes {
              id
              title
              link
              featuredImage {
                node {
                  altText
                  mediaItemUrl
                }
              }
              categories {
                nodes {
                  slug
                  name
                }
              }
            }
          }
          templates {
            nodes {
              title
            }
          }
        }
        totalCount
      }
    }
  `);
  const categories = data.allWpCategory.nodes;

  if (parentSlug) {
    const parent = categories.find(
      (category: { slug: string }) => category.slug === parentSlug
    );
    return parent
      ? categories.filter(
          (category: { parentDatabaseId: number | null }) =>
            category.parentDatabaseId === parent.categoryId
        )
      : [];
  }

  return categories.filter(
    (category: { parentDatabaseId: number | null }) =>
      !category.parentDatabaseId
  );
};
