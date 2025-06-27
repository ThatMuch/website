import "./AllPosts.scss";

import { CategoryType, PostType } from "../../utils/types";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import React, { useState } from "react";

import PostCard from "../PostCard/PostCard";
import { useBlogCategories } from "../../hooks/use-blog-categories";
import { useSitePosts } from "../../hooks/use-site-posts";

type Props = {
  title?: string;
  filter?: boolean;
  category?: string;
  isHome?: boolean;
};

export default function AllPosts({ title, filter, category, isHome }: Props) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const posts = useSitePosts(category ? category : selectedCategory);
  const postsPerPage: number = 8;
  const totalPages: number = Math.ceil((posts?.length || 0) / postsPerPage);
  const categories: CategoryType[] = useBlogCategories();
  const paginatedPosts = posts?.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );
  const renderPageNumbers = (): React.ReactNode => {
    const pageNumbers: React.ReactNode[] = [];
    for (let i = 1; i <= totalPages; i++) {
      const isActive: boolean = i === currentPage;
      const className: string = isActive ? "isActive" : "";
      pageNumbers.push(
        <button key={i} onClick={() => setCurrentPage(i)} className={className}>
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="AllPosts">
      {title && (
        <>
          <h2 className="DividerTitle">{title}</h2>
          <div className="divider mb-4"></div>
        </>
      )}
      {filter && (
        <div className="AllPosts_list">
          {/* All Posts Button */}
          <button
            className={`AllPosts_list_button ${!selectedCategory && "active"}`}
            onClick={() => setSelectedCategory("")}
          >
            Tous les articles
          </button>

          {/* Category Buttons */}
          {categories.map((category) => (
            <button
              key={category.slug}
              className={`AllPosts_list_button ${
                selectedCategory === category.slug && "active"
              }`}
              onClick={() => setSelectedCategory(category.slug)}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}
      <div className="PostsGrid">
        {!isHome
          ? paginatedPosts?.map((post, index) => (
              <div key={index}>
                <PostCard
                  title={post.title}
                  category={post?.categories?.nodes[0]}
                  url={post.link}
                  image={post.featuredImage?.node}
                />
              </div>
            ))
          : posts?.slice(0, 4).map((post, index) => (
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

      {totalPages > 1 && !isHome && (
        <div className="Pagination">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Page précédente"
            title="Boutton vers la page précédente"
          >
            <FaChevronLeft />
          </button>
          {renderPageNumbers()}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Page suivante"
            title="Boutton vers la page suivante"
          >
            <FaChevronRight />
          </button>
        </div>
      )}
      {isHome && (
        <div className="AllPosts__btn">
          <a
            href="/blog"
            className="btn btn-primary"
            onClick={() => setCurrentPage(1)}
            aria-label="Voir tous les articles"
            title="Lien vers tous les articles du blog"
          >
            Voir tous les articles
          </a>
        </div>
      )}
    </div>
  );
}
