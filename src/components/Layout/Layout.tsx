import "./Layout.scss";

import React, { useEffect } from "react";

import AOS from "aos";
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
    <>
      <main className={`Layout ${type && `Layout--${type}`}`}>
        <div className="container">
          <Header />
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
