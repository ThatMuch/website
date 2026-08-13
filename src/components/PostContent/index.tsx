import "../../components/GutenbergBlocks/FAQ/style.scss";
import "./style.scss";

import parse, { DOMNode, Element, Text } from "html-react-parser";

import FAQ from "../../components/GutenbergBlocks/FAQ/Faq";
import PostCTA from "../PostCTA";
import PostTOC from "../../components/PostTOC";
import React from "react";
import SocialMediaEmbed from "../../components/SocialMediaEmbed/SocialMediaEmbed";
import SpotifyEmbed from "../../components/SpotifyEmbed/SpotifyEmbed";
import YoutubeEmbed from "../../components/YoutubeEmbed/YoutubeEmbed";

type Props = {
  blocks: Array<any>;
  categories: Array<{ slug: string }>;
};

export default function PostContent({ blocks, categories }: Props) {
  const parseOptions = {
    replace: (domNode: DOMNode) => {
      // The TOC is now a fixed sidebar (PostTOC) generated from the post's
      // headings, so the WP TOC block's placeholder markup — wherever it
      // appears in the content, including nested inside another block like
      // a Group — is dropped here to avoid rendering a duplicate TOC.
      if (
        domNode instanceof Element &&
        domNode.name === "div" &&
        domNode.attribs &&
        domNode.attribs.class &&
        domNode.attribs.class.includes("wp-block-tm-multi-block-toc")
      ) {
        return null;
      }

      // Keep support for standard iframes

      if (
        domNode instanceof Element &&
        domNode.name === "iframe" &&
        domNode.attribs &&
        domNode.attribs.src &&
        domNode.attribs.src.includes("youtube.com")
      ) {
        return <YoutubeEmbed url={domNode.attribs.src} />;
      } else if (
        domNode instanceof Element &&
        domNode.name === "iframe" &&
        domNode.attribs &&
        domNode.attribs.src &&
        domNode.attribs.src.includes("spotify.com")
      ) {
        return <SpotifyEmbed url={domNode.attribs.src} />;
      } else if (
        domNode instanceof Element &&
        domNode.name === "iframe" &&
        domNode.attribs &&
        domNode.attribs.src &&
        domNode.attribs.src.includes("instagram.com")
      ) {
        return <SocialMediaEmbed url={domNode.attribs.src} />;
      } else if (
        domNode instanceof Element &&
        domNode.name === "iframe" &&
        domNode.attribs &&
        domNode.attribs.src &&
        domNode.attribs.src.includes("tiktok.com")
      ) {
        console.log(domNode.attribs.src);
        return <SocialMediaEmbed url={domNode.attribs.src} />;
      } else if (
        domNode instanceof Element &&
        domNode.name === "iframe" &&
        domNode.attribs &&
        domNode.attribs.src &&
        domNode.attribs.src.includes("tiktok.com")
      ) {
        return <SocialMediaEmbed url={domNode.attribs.src} />;
      } else if (
        domNode instanceof Element &&
        domNode.name === "iframe" &&
        domNode.attribs &&
        domNode.attribs.src &&
        domNode.attribs.src.includes("x.com")
      ) {
        return <SocialMediaEmbed url={domNode.attribs.src} />;
      }

      // Support for Gutenberg oEmbed <figure> block
      if (
        domNode instanceof Element &&
        domNode.name === "figure" &&
        domNode.attribs &&
        domNode.attribs.class
      ) {
        const isYoutube =
          domNode.attribs.class.includes("wp-block-embed-youtube") ||
          domNode.attribs.class.includes("is-provider-youtube");
        const isSpotify =
          domNode.attribs.class.includes("wp-block-embed-spotify") ||
          domNode.attribs.class.includes("is-provider-spotify");
        const isInstagram =
          domNode.attribs.class.includes("wp-block-embed-instagram") ||
          domNode.attribs.class.includes("is-provider-instagram");
        const isTiktok =
          domNode.attribs.class.includes("wp-block-embed-tiktok") ||
          domNode.attribs.class.includes("is-provider-tiktok");
        const isX =
          domNode.attribs.class.includes("wp-block-embed-x") ||
          domNode.attribs.class.includes("is-provider-x");

        if (isYoutube || isSpotify || isInstagram || isTiktok || isX) {
          const wrapperDiv = domNode.children.find(
            (child) =>
              child instanceof Element &&
              child.name === "div" &&
              child.attribs?.class?.includes("wp-block-embed__wrapper"),
          ) as Element | undefined;

          if (wrapperDiv && wrapperDiv.children) {
            const textNode = wrapperDiv.children.find(
              (child) => child instanceof Text,
            ) as Text | undefined;

            if (textNode && textNode.data) {
              const url = textNode.data.trim();
              if (url) {
                if (isYoutube) return <YoutubeEmbed url={url} />;
                if (isSpotify) return <SpotifyEmbed url={url} />;
                if (isInstagram) return <SocialMediaEmbed url={url} />;
                if (isTiktok) return <SocialMediaEmbed url={url} />;
                if (isX) return <SocialMediaEmbed url={url} />;
              }
            }
          }
        }
      }
    },
  };
  const renderBlocks = () => {
    return blocks.map((block, index) => {
      switch (block.name) {
        case "faq-block-for-gutenberg/faq":
          return <FAQ key={index} content={block.saveContent} />;
        case "tm-multi-block/toc":
          // Superseded by the PostTOC sidebar — drop the block to avoid a
          // duplicate TOC in the content flow.
          return null;
        case "core/embed":
          // WordPress oEmbed block (YouTube)
          return (
            <div key={index}>{parse(block.saveContent, parseOptions)}</div>
          );
        default:
          // Dynamic blocks (e.g. ACF blocks with a render_callback) have no
          // saveContent — their markup is only available via dynamicContent.
          return (
            <div key={index}>
              {parse(
                block.isDynamic ? block.dynamicContent : block.saveContent,
                parseOptions,
              )}
            </div>
          );
      }
    });
  };
  return (
    <div className="PostContent">
      <div className="post__content">{renderBlocks()}</div>
      <div className="PostContent__sidebar">
        <PostCTA categories={categories} />
        <PostTOC />
      </div>
    </div>
  );
}
