import Layout from "../../components/Layout";
import React from "react";
import Seo from "../../components/Seo";

const FrontPage = ({ data }) => {
  console.log(data);
  return (
    <div>
      <Layout type="frontpage">
        <Seo />
        <h1>FrontPage</h1>
      </Layout>
    </div>
  );
};

export default FrontPage;
