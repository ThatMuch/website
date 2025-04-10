import "normalize.css";
import "../../style/style.scss";

import HubspotForm from "react-hubspot-form";
import Layout from "../../components/Layout";
import PropTypes from "prop-types";
import React from "react";
import Seo from "../../components/Seo";
import { graphql } from "gatsby";

const Page = ({ data }) => {
  const page = data.wpPage;
  console.log(data);
  return (
    <Layout>
      <main>
        <h1>{page.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
        <HubspotForm
          portalId={page.hubspotForm.portalid}
          formId={page.hubspotForm.formId}
          onSubmit={() => console.log("Submit!")}
          onReady={(form) => console.log("Form ready!")}
        />
      </main>
    </Layout>
  );
};
export const pageQuery = graphql`
  query ($id: String!) {
    wpPage(id: { eq: $id }) {
      title
      content
      hubspotForm {
        formId
        portalid
        sousTitre
        titre
      }
    }
  }
`;

export default Page;
