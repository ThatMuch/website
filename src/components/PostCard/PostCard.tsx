import "./PostCard.scss";

import {
  GatsbyImage,
  IGatsbyImageData,
  StaticImage,
} from "gatsby-plugin-image";

import React from "react";

type PostCardProps = {
  title: string;
  category: {
    slug: string;
    name: string;
  };
  url: string;
  image: any;
};

export default function PostCard({
  title,
  category,
  url,
  image,
}: PostCardProps) {
  console.log(image);
  return (
    <article className="PostCard">
      <a href={url} className="PostCard__image">
        {image?.mediaItemUrl && (
          <img src={image.mediaItemUrl} alt={image.altText} className="mb-4" />
        )}
      </a>

      <span className={`tag tag--${category?.slug}`}>{category?.name}</span>
      <h3 className="PostCard__title mt-4">
        <a href={url}>{title}</a>
      </h3>
    </article>
  );
}
