const React = require("react");

const assetUrl = (mod) => (mod && mod.default) || mod;

// font-weight 700, utilisée par h1-h6 (dont le titre du hero, élément LCP)
const neueMachinaUltrabold = assetUrl(require("./src/fonts/NeueMachina-Ultrabold.woff2"));
// police de base du <body>, utilisée notamment dans le texte du hero
const spaceMonoRegular = assetUrl(require("./src/fonts/SpaceMono-Regular.woff2"));
// image de fond du hero (posée en CSS background-image), élément LCP
const heroImage = assetUrl(require("./src/images/hero.webp"));

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      rel="preload"
      href={heroImage}
      as="image"
      type="image/webp"
      fetchpriority="high"
      key="preload-hero-image"
    />,
    <link
      rel="preload"
      href={neueMachinaUltrabold}
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="preload-neuemachina-ultrabold"
    />,
    <link
      rel="preload"
      href={spaceMonoRegular}
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="preload-spacemono-regular"
    />,
    <link
      rel="preconnect"
      href="https://www.googletagmanager.com"
      key="preconnect-gtm"
    />,
    <link
      rel="preconnect"
      href="https://www.google-analytics.com"
      key="preconnect-ga"
    />,
    <link
      rel="preconnect"
      href="https://content.hotjar.io"
      crossOrigin="anonymous"
      key="preconnect-hotjar"
    />,
    <link
      rel="preconnect"
      href="https://consent.cookiebot.com"
      crossOrigin="anonymous"
      key="preconnect-cookiebot"
    />,
    <link
      rel="preconnect"
      href="https://kit.fontawesome.com"
      crossOrigin="anonymous"
      key="preconnect-fontawesome"
    />,
    <script
      src="https://kit.fontawesome.com/555987a337.js"
      crossOrigin="anonymous"
      key="font-awesome-kit"
    />,
  ]);
};
