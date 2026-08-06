import AllTemplates from "../../components/AllTemplates/AllTemplates";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Layout from "../../components/Layout";
import React from "react";
import Seo from "../../components/Seo";
import TemplateForm from "../../components/TemplateForm";
import { graphql } from "gatsby";
import { sanitizeHtml } from "../../utils/sanitize";
import { useSiteSeo } from "../../hooks/use-site-seo";

export default function Template({ data }) {
  const page = data.wpTemplate;
  const { siteUrl } = useSiteSeo();
  return (
    <Layout type="template">
      <Seo
        title={page.title}
        description={page.seo.metaDesc}
        pathname={`/ressources/templates/${page.slug}`}
        breadcrumbs={[
          { pathname: `/ressources`, label: "Ressources" },
          { pathname: `/ressources/templates`, label: "Templates" },
        ]}
        currentPage={page.title}
        schema={{
          "@type": "CreativeWork",
          name: page.title,
          description: page.seo.metaDesc,
          image: page.featuredImage?.node?.mediaItemUrl,
          url: `${siteUrl}/ressources/templates/${page.slug}`,
          author: { "@id": `${siteUrl}/#organization` },
          keywords: page.categories?.nodes?.length
            ? page.categories.nodes.map((c) => c.name).join(", ")
            : undefined,
        }}
      />
      <div className="template-content">
        <Breadcrumb
          crumbs={[
            {
              pathname: `/ressources`,
              label: "Ressources",
            },
            {
              pathname: `/ressources/templates`,
              label: "Templates",
            },
          ]}
          currentPage={page.title}
        />
        <h2>Template</h2>
        <div className="divider mb-4"></div>
        <h1>{page.title}</h1>
        {page.content && (
          <div
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(page.content) }}
          ></div>
        )}
        {page.hubspotForm.formId && (
          <TemplateForm
            hubspotForm={page.hubspotForm}
            image={page.featuredImage?.node}
            title={"Téléchargez notre template"}
          />
        )}
        <AllTemplates title="Les derniers templates" />
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query ($id: String!) {
    wpTemplate(id: { eq: $id }) {
      id
      slug
      title
      content
      featuredImage {
        node {
          altText
          mediaItemUrl
          title
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      hubspotForm {
        formId
        portalid
        titre
        fieldGroupName
      }
      seo {
        metaDesc
        metaKeywords
        title
      }
    }
  }
`;
