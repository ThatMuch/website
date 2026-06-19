import "./PostCard.scss";

import { GatsbyImage, IGatsbyImageData, getImage } from "gatsby-plugin-image";

import { Link } from "gatsby";
import React from "react";

type PostCardProps = {
  title: string;
  date: string;
  category: {
    slug: string;
    name: string;
  };
  url: string;
  image: {
    mediaItemUrl: string;
    altText: string;
    localFile?: {
      childImageSharp: {
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
  date,
}: PostCardProps) {
  const renderImage = () => {
    if (image?.mediaItemUrl) {
      return (
        <img
          src={image.mediaItemUrl}
          alt={image.altText || ""}
          loading="lazy"
          className="mb-4"
        />
      );
    }
    return null;
  };

  return (
    <article className="PostCard">
      <Link
        to={url}
        className="PostCard__image"
        title={"Image de l'article " + title}
      >
        {renderImage()}
      </Link>

      <div className="PostCard__meta">
        <span className={`tag tag--${category?.slug}`}>{category?.name}</span>
        <span className="PostCard__date">{date}</span>
      </div>

      <h3 className="PostCard__title">
        <Link to={url} title={"Lien vers l'article " + title}>
          {title}
        </Link>
      </h3>
    </article>
  );
}
