import "./PostCard.scss";

import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import { LazyLoadImage } from "react-lazy-load-image-component";
import React from "react";

type PostCardProps = {
  title: string;
  category: {
    slug: string;
    name: string;
  };
  url: string;
  image: {
    mediaItemUrl: string;
    altText: string;
    localFile?: {
      childImageSharp?: {
        gatsbyImageData: IGatsbyImageData;
      };
    };
  };
};

export default function PostCard({
  title,
  category,
  url,
  image,
}: PostCardProps) {
  const gatsbyImageData = image?.localFile?.childImageSharp?.gatsbyImageData;

  return (
    <article className="PostCard">
      <a
        href={url}
        className="PostCard__image"
        title={"Image de l'article " + title}
      >
        {gatsbyImageData ? (
          <GatsbyImage
            image={gatsbyImageData}
            alt={image?.altText || title}
            className="mb-4"
          />
        ) : (
          image?.mediaItemUrl && (
            <LazyLoadImage
              src={image.mediaItemUrl}
              alt={image?.altText || title}
              effect="blur"
              className="mb-4"
            />
          )
        )}
      </a>

      <span className={`tag tag--${category?.slug}`}>{category?.name}</span>
      <h3 className="PostCard__title mt-4">
        <a href={url} title={"Lien vers l'article " + title}>
          {title}
        </a>
      </h3>
    </article>
  );
}
