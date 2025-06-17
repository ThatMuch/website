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
import logoThatIsWhite from "../../images/THATMUCH_Logo_White.webp";
import { useSiteMenu } from "../../hooks/use-site-menu";
import { useSitePosts } from "../../hooks/use-site-posts";
import { useSiteSeo } from "../../hooks/use-site-seo";

type Props = {};

export default function Footer({}: Props) {
  const menuItems = useSiteMenu().filter((item) =>
    item.locations.includes("GATSBY_FOOTER_MENU")
  );

  const site = useSiteSeo();
  const { siteUrl } = site;
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
        <FaInstagram size={44} className="RS_Section__icon" title="Instagram" />
      ),
      url: "https://www.instagram.com/thatmuch/",
    },
    {
      name: "Tiktok",
      icon: <FaTiktok size={44} className="RS_Section__icon" title="Tiktok" />,
      url: "https://www.tiktok.com/@thatmuch_fr",
    },
    {
      name: "Linkedin",
      icon: (
        <FaLinkedin size={44} className="RS_Section__icon" title="Linkedin" />
      ),
      url: "https://www.linkedin.com/company/thatmuch/",
    },
    {
      name: "Spotify",
      icon: (
        <FaSpotify size={44} className="RS_Section__icon" title="Spotify" />
      ),
      url: "https://open.spotify.com/show/5WyDmb1QFI1BmryUE0f8Y4?si=90bf60ef53f34909",
    },
    {
      name: "Youtube",
      icon: (
        <FaYoutube size={44} className="RS_Section__icon" title="Youtube" />
      ),
      url: "https://www.youtube.com/@thatmuch_fr",
    },
    {
      name: "Bluesky",
      icon: (
        <FaBluesky size={44} className="RS_Section__icon" title="Bluesky" />
      ),
      url: "https://bsky.app/profile/thatmuch.fr",
    },
  ];
  return (
    <footer>
      <div className="RS_Section">
        <h3 className="RS_Section__title">Suivez nous</h3>
        <div className="RS_Section__list">
          {socialLinks.map((link: SocialLinksType) => (
            <a
              key={link.name + "-00"}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="RS_Section__item"
              title={"Lien vers " + link.name}
              aria-label={link.name}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>

      <div className="Footer">
        <a
          href={siteUrl}
          className="Footer__logo"
          title="Logo de Thatmuch"
          aria-label="Logo Thatmuch"
        >
          <LazyLoadImage src={logoThatIsWhite} alt="Logo Thatmuch en blanc" />
        </a>
        <div>
          <h4 className="mb-2">Articles récents</h4>
          <ul>
            {posts?.slice(0, 4).map((post) => (
              <li key={post.id}>
                <a href={post.link}>{post.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="Footer__credits">
        <p>© {new Date().getFullYear()} THATMUCH - Tous droits réservés</p>
        {menuItems.map((item) => (
          <p key={item.id}>
            <a href={item.path}>{item.label}</a>
          </p>
        ))}
      </div>
    </footer>
  );
}
