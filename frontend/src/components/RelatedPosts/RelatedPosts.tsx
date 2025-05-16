import "./RelatedPosts.scss";

import PostCard from "../PostCard/PostCard";
import { PostType } from "../../utils/types";
import React from "react";
import { useSitePosts } from "../../hooks/use-site-posts";

type Props = {
  category: string;
  currentPostId?: string;
  title?: string;
};

export default function RelatedPosts({
  category,
  currentPostId,
  title = "Articles similaires",
}: Props) {
  const posts = useSitePosts(category);
  posts.splice(
    posts.findIndex((post: PostType) => post.id === currentPostId),
    1
  );
  if (posts.length === 0) return null;
  return (
    <div className="RelatedPosts">
      <h3 className="RelatedPosts__title">{title}</h3>
      <div className="divider mb-4"></div>
      <div className="RelatedPosts__grid">
        {posts?.slice(0, 3).map((post: PostType, index) => (
          <div key={index}>
            <PostCard
              title={post?.title}
              category={post?.categories?.nodes[0]}
              url={post?.link}
              image={post?.featuredImage?.node}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
