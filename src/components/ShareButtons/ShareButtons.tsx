import "./ShareButtons.scss";

import {
  FaCheck,
  FaEnvelope,
  FaFacebookF,
  FaLink,
  FaLinkedinIn,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
import React, { useEffect, useState } from "react";

type Props = {
  title: string;
  hidden?: boolean;
};

const SCROLL_THRESHOLD = 80;
const COPIED_TIMEOUT = 2000;

export default function ShareButtons({ title, hidden }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);

    const handleScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      name: "Facebook",
      icon: <FaFacebookF />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "X",
      icon: <FaXTwitter />,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp />,
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      name: "Email",
      icon: <FaEnvelope />,
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), COPIED_TIMEOUT);
    } catch (e) {
      console.error("Impossible de copier le lien", e);
    }
  };

  return (
    <div
      className={`ShareButtons ${
        scrolled && !hidden ? "ShareButtons--visible" : ""
      }`}
    >
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="ShareButtons__item"
          aria-label={`Partager sur ${link.name}`}
          title={`Partager sur ${link.name}`}
        >
          {link.icon}
        </a>
      ))}
      <button
        type="button"
        onClick={handleCopy}
        className={`ShareButtons__item ShareButtons__item--copy ${
          copied ? "ShareButtons__item--copied" : ""
        }`}
        aria-label="Copier le lien de l'article"
        title={copied ? "Lien copié !" : "Copier le lien"}
      >
        {copied ? <FaCheck /> : <FaLink />}
      </button>
    </div>
  );
}
