import "./PostCard.scss";

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
    mediaItemUrl: string
    altText: string
  }
};

export default function PostCard({
  title,
  category,
  url,
  image,
}: PostCardProps) {
  return (
    <article className="PostCard">
      <a
        href={url}
        className="PostCard__image"
        title={"Image de l'article " + title}
      >
        {image?.mediaItemUrl && (
          <LazyLoadImage
            src={image.mediaItemUrl}
            alt={image.altText}
            effect="blur"
            className="mb-4"
          />
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
