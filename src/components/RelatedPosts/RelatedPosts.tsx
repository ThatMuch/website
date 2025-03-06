import "./RelatedPosts.scss";

import React, { useEffect, useState } from "react";

import PostCard from "../PostCard/PostCard";
import { PostType } from "../../utils/types";
import { useBlogCategories } from "../../hooks/use-blog-categories";

type Props = {
  category: string;
  currentPostId?: string;
};

export default function RelatedPosts({ category, currentPostId }: Props) {
  const [posts, setPosts] = useState([]);
  const cats = useBlogCategories();
  useEffect(() => {
    const postsFiltered = cats
      .filter((cat) => cat.slug === category)[0]
      ?.posts?.nodes.slice(0, 3)
      .filter((post) => post.id !== currentPostId);

    setPosts(postsFiltered);
  }, [category]);

  if (posts.length === 0) return null;
  return (
    <div className="RelatedPosts">
      <h3 className="RelatedPosts__title">Articles similaires</h3>
      <div className="divider mb-4"></div>
      <div className="RelatedPosts__grid">
        {posts?.map((post: PostType, index) => (
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
