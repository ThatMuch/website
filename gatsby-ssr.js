const React = require("react");

const GTM_ID = "GTM-W2WV9WGR";

const assetUrl = (mod) => (mod && mod.default) || mod;

// font-weight 700, utilisée par h1-h6 (dont le titre du hero, élément LCP)
const neueMachinaUltrabold = assetUrl(require("./src/fonts/NeueMachina-Ultrabold.woff2"));
// police de base du <body>, utilisée notamment dans le texte du hero
const spaceMonoRegular = assetUrl(require("./src/fonts/SpaceMono-Regular.woff2"));

exports.onRenderBody = ({ setHeadComponents, setPreBodyComponents }) => {
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

  if (process.env.NODE_ENV === "production") {
    setHeadComponents([
      <script
        key="gtm-datalayer"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || []; window.dataLayer.push({ platform: "gatsby" });`,
        }}
      />,
      <script
        key="gtm-partytown"
        type="text/partytown"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
        }}
      />,
    ]);

    setPreBodyComponents([
      <noscript
        key="gtm-noscript"
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden" aria-hidden="true"></iframe>`,
        }}
      />,
    ]);
  }
};
