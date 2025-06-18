import "./PostHeader.scss";

import { LazyLoadImage } from "react-lazy-load-image-component";
import React from "react";

type Props = {
  title: string;
  author: any;
  category: string;
  postDate: string;
};

export default function PostHeader({
  title,
  author,
  category,
  postDate,
}: Props) {
  return (
    <div className={`PostHeader PostHeader--${category.toLowerCase()}`}>
      <div>
        <h1 className="PostHeader__title">{title}</h1>
        <div className="PostHeader__meta">
          <LazyLoadImage
            src={author.avatar.url}
            alt={author.name}
            className="PostHeader__avatar"
          />
          <div className="PostHeader__author">
            <p>{author.name} </p>
            <p>{postDate} </p>
          </div>
        </div>
      </div>
    </div>
  );
}
