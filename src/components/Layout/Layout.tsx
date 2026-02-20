import "@wordpress/block-library/build-style/style.css";
import "./Layout.scss";

import React, { useEffect } from "react";

import ClickSpark from "../ClickSpark/ClickSpark";
import Footer from "../Footer/Footer";
import Header from "../Header";

type Props = {
  type?: string;
  children: React.ReactNode;
};
export default function Layout({ type, children }: Props) {
  return (
    <ClickSpark
      sparkColor="#1e1244"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <Header />
      <main className={`Layout ${type && `Layout--${type}`}`}>
        {type === "frontpage" ? (
          children
        ) : (
          <div className="container">{children}</div>
        )}
      </main>
      <Footer />
    </ClickSpark>
  );
}
