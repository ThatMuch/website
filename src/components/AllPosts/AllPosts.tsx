import "./AllPosts.scss";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import React, { useState } from "react";

import PostCard from "../PostCard/PostCard";
import { PostType } from "../../utils/types";

type Props = {
  posts: PostType[];
  title?: string;
};

export default function AllPosts({ posts, title }: Props) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage: number = 8;

  const totalPages: number = Math.ceil((posts?.length || 0) / postsPerPage);

  const renderPageNumbers = (): React.ReactNode => {
    const pageNumbers: React.ReactNode[] = [];
    for (let i = 1; i <= totalPages; i++) {
      const isActive: boolean = i === currentPage;
      const className: string = isActive ? "active" : "";
      pageNumbers.push(
        <button key={i} onClick={() => setCurrentPage(i)} className={className}>
          {i}
        </button>
      );
    }
    return pageNumbers;
  };
  return (
    <div>
      <div className="BlogCategoryFilter">
        {title && (
          <>
            <h2 className="DividerTitle">{title}</h2>
            <div className="divider mb-4"></div>
          </>
        )}
        <div className="PostsGrid">
          {posts?.map((post, index) => (
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

        {totalPages > 1 && (
          <div className="Pagination">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FaChevronLeft />
            </button>
            {renderPageNumbers()}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
