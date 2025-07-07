import "@wordpress/block-library/build-style/style.css";
import "./Layout.scss";

import React, { useEffect } from "react";

import AOS from "aos";
import ClickSpark from "../ClickSpark/ClickSpark";
import Footer from "../Footer/Footer";
import Header from "../Header";

type Props = {
  type?: string;
  children: React.ReactNode;
};
export default function Layout({ type, children }: Props) {
  useEffect(() => {
    AOS.init({
      anchorPlacement: "top-bottom",
      easing: "ease-in-out",
    });
    AOS.refresh();
  }, []);
  return (
    <ClickSpark
      sparkColor="#1e1244"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <main className={`Layout ${type && `Layout--${type}`}`}>
        <div className="container">
          <Header />
          {children}
        </div>
      </main>
      <Footer />
    </ClickSpark>
  );
}
