const React = require("react");

const assetUrl = (mod) => (mod && mod.default) || mod;

// font-weight 700, utilisée par h1-h6 (dont le titre du hero, élément LCP)
const neueMachinaUltrabold = assetUrl(require("./src/fonts/NeueMachina-Ultrabold.woff2"));
// police de base du <body>, utilisée notamment dans le texte du hero
const spaceMonoRegular = assetUrl(require("./src/fonts/SpaceMono-Regular.woff2"));

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
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
  ]);
};
