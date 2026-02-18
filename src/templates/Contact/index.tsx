import "normalize.css";
import "../../style/style.scss";

import ContactForm from "../../components/ContactForm";
import HubspotForm from "react-hubspot-form";
import Layout from "../../components/Layout";
import React from "react";
import Seo from "../../components/Seo";
import { graphql } from "gatsby";

const Contact = ({ data }) => {
  const page = data.wpPage;

  return (
    <Layout>
      <main>
        <ContactForm hubspotForm={page.hubspotForm} />
        {page.content && (
          <div dangerouslySetInnerHTML={{ __html: page.content }} />
        )}
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

export default Contact;
