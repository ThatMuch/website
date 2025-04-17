import FrontPage from "../templates/FrontPage";
import React from "react";
import { graphql } from "gatsby";
import { useStaticQuery } from "gatsby";

const query = graphql`
  query {
    wpPage(isFrontPage: { eq: true }) {
      title
      content
      slug
      seo {
        metaDesc
        metaKeywords
        title
      }
    }
  }
`;

const IndexPage = () => {
  const data = useStaticQuery(query);
  const { wpPage } = data;
	  return (
	<FrontPage data={wpPage} />
  );
};

export default IndexPage;
