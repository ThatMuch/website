import "./Footer.scss";

import { FaBluesky, FaLinkedin, FaSpotify, FaYoutube } from "react-icons/fa6";

import React from "react";
import logoThatIsWhite from "../../images/THATMUCH_Logo_White.png";
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
  return (
    <footer>
      <div className="RS_Section">
        <h3 className="RS_Section__title">Suivez nous</h3>
        <div className="RS_Section__list">
          <a
            href="https://www.linkedin.com/company/thatmuch/"
            target="_blank"
            rel="noreferrer"
            title="Linkedin"
            aria-label="Linkedin"
          >
            <FaLinkedin
              size={44}
              className="RS_Section__icon"
              title="Linkedin"
            />
          </a>
          <a
            href="https://open.spotify.com/show/5WyDmb1QFI1BmryUE0f8Y4?si=90bf60ef53f34909"
            target="_blank"
            rel="noreferrer"
            title="Spotify"
            aria-label="Spotify"
          >
            <FaSpotify size={44} className="RS_Section__icon" title="Spotify" />
          </a>
          <a
            href="https://www.youtube.com/@thatmuch_fr"
            target="_blank"
            rel="noreferrer"
            title="Youtube"
            aria-label="Youtube"
          >
            <FaYoutube size={44} className="RS_Section__icon" title="Youtube" />
          </a>
          <a
            href="https://bsky.app/profile/thatmuch.fr"
            target="_blank"
            rel="noreferrer"
            title="Bluesky"
            aria-label="Bluesky"
          >
            <FaBluesky size={44} className="RS_Section__icon" title="Bluesky" />
          </a>
        </div>
      </div>

      <div className="Footer">
        <a
          href={siteUrl}
          className="Footer__logo"
          title="Logo Thatmuch"
          aria-label="Logo Thatmuch"
        >
          <img src={logoThatIsWhite} alt="Logo Thatmuch en blanc" />
        </a>
        <div>
          <h4 className="mb-2">Articles récents</h4>
          <ul>
            {posts?.slice(0, 4).map((post) => (
              <li key={post.slug}>
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
