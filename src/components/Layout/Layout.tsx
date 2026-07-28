import "@wordpress/block-library/build-style/style.css";
import "./Layout.scss";

import React, { useEffect, useRef, useState } from "react";

import ClickSpark from "../ClickSpark/ClickSpark";
import Footer from "../Footer/Footer";
import Header from "../Header";

type Props = {
  type?: string;
  children: React.ReactNode;
};
export default function Layout({ type, children }: Props) {
  const footerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [footerReached, setFooterReached] = useState(false);

  useEffect(() => {
    if (type !== "post") return;
    const footerEl = footerRef.current;
    if (!footerEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFooterReached(entry.isIntersecting),
      { rootMargin: "0px" },
    );
    observer.observe(footerEl);

    return () => observer.disconnect();
  }, [type]);

  // Make the bar's fill animation finish exactly when the footer is reached,
  // instead of at the very bottom of the (taller) document scroll range.
  useEffect(() => {
    if (type !== "post") return;
    const footerEl = footerRef.current;
    const barEl = barRef.current;
    if (!footerEl || !barEl) return;

    const updateRange = () => {
      const footerTop = footerEl.getBoundingClientRect().top + window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const rangeEnd = footerTop - window.innerHeight;
      const percent = Math.min(100, Math.max(0, (rangeEnd / maxScroll) * 100));
      barEl.style.setProperty("--bar-range-end", `${percent}%`);
    };

    updateRange();
    window.addEventListener("resize", updateRange);
    const resizeObserver = new ResizeObserver(updateRange);
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener("resize", updateRange);
      resizeObserver.disconnect();
    };
  }, [type]);

  return (
    <ClickSpark
      sparkColor="#1e1244"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <Header />
      {type === "post" && (
        <div
          ref={barRef}
          className={`bar ${footerReached ? "bar--hidden" : ""}`}
        ></div>
      )}
      <main className={`Layout ${type && `Layout--${type}`}`}>
        {type === "frontpage" ? (
          children
        ) : (
          <div className="container">{children}</div>
        )}
      </main>
      <div ref={footerRef}>
        <Footer />
      </div>
    </ClickSpark>
  );
}
