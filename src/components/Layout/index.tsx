import "normalize.css";
import "./style.scss";

import React, { useEffect } from "react";

import AOS from "aos";
import Header from "../Header";

export default function Layout({ children }) {
  useEffect(() => {
    AOS.init({
      anchorPlacement: "top-bottom",
      easing: "ease-in-out",
    });
    AOS.refresh();
  }, []);
  return (
    <>
      <Header />
      {children}
    </>
  );
}
