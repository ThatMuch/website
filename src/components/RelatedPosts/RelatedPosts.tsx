import "./RelatedPosts.scss";

import React, { useEffect, useState } from "react";

import PostCard from "../PostCard/PostCard";
import { useBlogCategories } from "../../hooks/use-blog-categories";

type Props = {
  category: string;
};

export default function RelatedPosts({ category }: Props) {
  const [posts, setPosts] = useState([]);
  const cats = useBlogCategories();
  useEffect(() => {
    const postsFiltered = cats
      .filter((cat) => cat.slug === category)[0]
      .posts.nodes.slice(0, 3);

    setPosts(postsFiltered);
  }, [category]);

  return (
    <div className="RelatedPosts">
      <h3 className="RelatedPosts__title">Articles similaires</h3>
      <div className="divider mb-4"></div>
      <div className="RelatedPosts__grid">
        {posts.map((post, index) => (
          <div key={index}>
            <PostCard
              title={post.title}
              category={post?.categories?.nodes[0]}
              url={post.link}
              image={post.featuredImage?.node}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
