import "./Header.scss";

import React, { useEffect, useState } from "react";

import close from "../../images/29-cross-outline.png";
import close_gif from "../../images/29-cross-outline.gif";
import comet from "../../images/Comet.svg";
import logo from "../../images/THATMUCH_Logo_Black.png";
import { useSiteMenu } from "../../hooks/use-site-menu";
import { useSiteSeo } from "../../hooks/use-site-seo";

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [isOpened, setIsOpened] = useState(false);
  const [isActive, setIsActive] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuItems = useSiteMenu().filter((item) =>
    item.locations.includes("GATSBY_HEADER_MENU")
  );
  const site = useSiteSeo();
  const { siteUrl } = site;
  return (
    <header>
      <div className="menu">
        <button
          id="bento-menu"
          className="ml-auto menu__button"
          onClick={() => setIsOpened(true)}
        >
          <div className="bento">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
          {!isScrolled && <span className="menu__txt">Menu</span>}
        </button>
        {isOpened ? (
          <div className="menu__wrapper">
            <button
              id="btn_close"
              className="btn_close"
              onClick={() => setIsOpened(false)}
            >
              <img className="close" src={close} alt="Close Thatmuch" />
              <img
                className="close_hover"
                src={close_gif}
                alt="Close Thatmuch"
              />
            </button>
            <a href={siteUrl} title="Logo Thatmuch" aria-label="Logo Thatmuch">
              <img src={logo} alt="Thatmuch" className="logo" />
            </a>
            <div className="row">
              <div className="col-12 col-sm-4 ">
                <ul>
                  {menuItems.map((item, index) => (
                    <li
                      key={item.id}
                      data-aos="slide-up"
                      data-aos-delay={index * 100}
                      onMouseEnter={() => setIsActive(index)}
                      className="pr-1"
                    >
                      <a
                        href={item.url}
                        target={item.target}
                        onClick={() => setIsOpened(false)}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="d-none d-sm-flex col-sm-8  align-items-center">
                {menuItems[isActive].description && (
                  <p className="menu__item__desc">
                    {menuItems[isActive].description}
                  </p>
                )}
                <div className="comets">
                  <img
                    data-aos="fade-down-left"
                    data-aos-delay="100"
                    src={comet}
                    alt="Comet Thatmuch"
                  />
                  <img
                    data-aos="fade-down-left"
                    data-aos-delay="200"
                    src={comet}
                    alt="Comet Thatmuch"
                  />
                  <img
                    data-aos="fade-down-left"
                    data-aos-delay="300"
                    src={comet}
                    alt="Comet Thatmuch"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <a href="/">
        <img src={logo} alt="Thatmuch" className="logo--header" />
      </a>
      <a
        href="https://meetings-eu1.hubspot.com/mathilde-arconte"
        className="btn btn-primary"
        target="_blank"
        rel="noopener noreferrer"
        title="Programmez un appel"
        aria-label="Programmez un appel"
        data-aos="fade-down"
        data-aos-delay="100"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-anchor-placement="top-bottom"
        data-aos-offset="0"
        data-aos-once="true"
        data-aos-anchor="#bento-menu"
      >
        {isMobile ? "RDV" : "Programmez un appel"}
      </a>
    </header>
  );
}
