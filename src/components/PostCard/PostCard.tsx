import "./PostCard.scss";

import { Link } from "gatsby";
import React from "react";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";

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
}: PostCardProps) {
  const isInternal = url.startsWith("/");
  const gatsbyImage = image?.localFile ? getImage(image.localFile) : null;

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
      {isInternal ? (
        <Link
          to={url}
          className="PostCard__image"
          title={"Image de l'article " + title}
        >
          {renderImage()}
        </Link>
      ) : (
        <a
          href={url}
          className="PostCard__image"
          title={"Image de l'article " + title}
        >
          {renderImage()}
        </a>
      )}

      <span className={`tag tag--${category?.slug}`}>{category?.name}</span>
      <h3 className="PostCard__title mt-4">
        {isInternal ? (
          <Link to={url} title={"Lien vers l'article " + title}>
            {title}
          </Link>
        ) : (
          <a href={url} title={"Lien vers l'article " + title}>
            {title}
          </a>
        )}
      </h3>
    </article>
  );
}
