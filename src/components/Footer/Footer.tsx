import "./Footer.scss";

import {
  FaBluesky,
  FaInstagram,
  FaLinkedin,
  FaSpotify,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa6";

import { LazyLoadImage } from "react-lazy-load-image-component";
import React from "react";
import { Link } from "gatsby";
import logoThatIsWhite from "../../images/THATMUCH_Logo_White.webp";
import logoThatIsWhiteParallax from "../../images/LogoTHATMUCHWhite.webp";
import { useSiteMenu } from "../../hooks/use-site-menu";
import { useSitePosts } from "../../hooks/use-site-posts";
import { useSiteSeo } from "../../hooks/use-site-seo";

type Props = {};

export default function Footer({}: Props) {
  const menuItems = useSiteMenu("GATSBY_FOOTER_MENU");
  const site = useSiteSeo();
  const posts = useSitePosts();
  type SocialLinksType = {
    name: string;
    icon: React.ReactNode;
    url: string;
  };
  const socialLinks: SocialLinksType[] = [
    {
      name: "Instagram",
      icon: (
        <FaInstagram size={30} className="Footer__socials__item__icon" title="Instagram" />
      ),
      url: "https://www.instagram.com/thatmuch/",
    },
    {
      name: "Tiktok",
      icon: <FaTiktok size={30} className="Footer__socials__item__icon" title="Tiktok" />,
      url: "https://www.tiktok.com/@ipeach_tv",
    },
    {
      name: "Linkedin",
      icon: (
        <FaLinkedin size={30} className="Footer__socials__item__icon" title="Linkedin" />
      ),
      url: "https://www.linkedin.com/company/thatmuch/",
    },
    {
      name: "Spotify",
      icon: (
        <FaSpotify size={30} className="Footer__socials__item__icon" title="Spotify" />
      ),
      url: "https://open.spotify.com/show/5WyDmb1QFI1BmryUE0f8Y4?si=90bf60ef53f34909",
    },
    {
      name: "Youtube",
      icon: (
        <FaYoutube size={30} className="Footer__socials__item__icon" title="Youtube" />
      ),
      url: "https://www.youtube.com/@ipeach_tv",
    },
    {
      name: "Bluesky",
      icon: (
        <FaBluesky size={30} className="Footer__socials__item__icon" title="Bluesky" />
      ),
      url: "https://bsky.app/profile/thatmuch.fr",
    },
  ];
  return (
    <div className="Footer-wrapper">
    <footer>
       <h2 className="visually-hidden">Pied de page</h2>
        <div className="Footer">
          <div className="Footer__contact">
        <Link
          to="/"
          className="Footer__logo"
          title="Logo de Thatmuch"
          aria-label="Logo Thatmuch"
        >
          <LazyLoadImage src={logoThatIsWhite} alt="Logo Thatmuch en blanc" />
            </Link>
            <div className="Footer__socials">
  {socialLinks.map((link: SocialLinksType) => (
            <a
              key={link.name + "-00"}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="Footer__socials__item"
              title={"Lien vers " + link.name}
              aria-label={link.name}
            >
              {/* Remove title from icon to avoid redundancy with aria-label on link */}
              {React.cloneElement(link.icon as React.ReactElement, {
                title: undefined,
              })}
            </a>
          ))}
            </div>
            <Link to="/contact" className="btn btn-primary">
              <div className="btn__overlay"></div>
              <span className="btn__content">
                Nous contacter
              </span>
            </Link>
          </div>
          <div className="row">
          <div className="col-12 col-sm-4">
            <h4>Expertises</h4>
            <ul>
                <li key="dev">
                  <Link to="/expertise/developpement-front-end">Développement web</Link>
                </li>
                <li key="uxui">
                  <Link to="/expertise/ux-ui-design">UX/UI</Link>
                </li>
            </ul>
          </div>
          <div className="col-12 col-sm-4">
          <h4 className="mb-2">Articles récents</h4>
          <ul>
            {posts?.slice(0, 4).map((post) => (
              <li key={post.id}>
                <Link to={post.uri || post.link}>{post.title}</Link>
              </li>
            ))}
          </ul>
          </div>
          </div>

        </div>

      <div className="Footer__credits">
        <p>© {new Date().getFullYear()} THATMUCH - Tous droits réservés</p>
        {menuItems.map((item) => (

              <Link key={item.id} to={item.path}>{item.label}</Link>

        ))}
      </div>
    </footer>
      <div className="footer-parallax">
        <LazyLoadImage src={logoThatIsWhiteParallax} alt="Logo Thatmuch en blanc" />
    </div>
    </div>
  );
}
