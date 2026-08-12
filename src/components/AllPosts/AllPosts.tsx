import "./AllPosts.scss";

import { CategoryType, PostType } from "../../utils/types";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import React, { useState } from "react";

import { Link } from "gatsby";
import PostCard from "../PostCard/PostCard";
import { useBlogCategories } from "../../hooks/use-blog-categories";
import { useSitePosts } from "../../hooks/use-site-posts";

type Props = {
  title?: string;
  filter?: boolean;
  category?: string;
  parentCategory?: string;
  isHome?: boolean;
  posts?: PostType[];
};

export default function AllPosts({
  title,
  filter,
  category,
  parentCategory,
  isHome,
  posts: customPosts,
}: Props) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const baseCategory = category || parentCategory;
  const fetchedPosts = useSitePosts(selectedCategory || baseCategory);

  const posts = React.useMemo(() => {
    const rawPosts = customPosts ?? fetchedPosts;
    if (customPosts && selectedCategory) {
      return rawPosts.filter((post) =>
        post.categories?.nodes?.some((cat) => cat.slug === selectedCategory),
      );
    }
    return rawPosts;
  }, [customPosts, fetchedPosts, selectedCategory]);

  const postsPerPage: number = 9;
  const totalPages: number = Math.ceil((posts?.length || 0) / postsPerPage);
  const categories: CategoryType[] = useBlogCategories(parentCategory);
  const paginatedPosts = posts?.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage,
  );
  const renderPageNumbers = (): React.ReactNode => {
    const pageNumbers: React.ReactNode[] = [];
    for (let i = 1; i <= totalPages; i++) {
      const isActive: boolean = i === currentPage;
      const className: string = isActive ? "isActive" : "";
      pageNumbers.push(
        <button key={i} onClick={() => setCurrentPage(i)} className={className}>
          {i}
        </button>,
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
      {(filter || (parentCategory && categories.length > 0)) && (
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
      <div
        className={`PostsGrid ${
          (!isHome ? paginatedPosts?.length : Math.min(posts?.length || 0, 4)) <
          3
            ? "PostsGrid--few"
            : ""
        }`}
      >
        {!isHome
          ? paginatedPosts?.map((post, index) => (
              <div key={index}>
                <PostCard
                  title={post.title}
                  category={post?.categories?.nodes[0]}
                  url={post.uri || post.link}
                  image={post.featuredImage?.node}
                  date={post.date}
                />
              </div>
            ))
          : posts?.slice(0, 3).map((post, index) => (
              <div key={index}>
                <PostCard
                  title={post.title}
                  category={post?.categories?.nodes[0]}
                  url={post.uri || post.link}
                  image={post.featuredImage?.node}
                  date={post.date}
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
          <Link
            to="/blog"
            className="btn btn-primary"
            aria-label="Voir tous les articles"
            title="Lien vers tous les articles du blog"
          >
            Voir tous les articles
          </Link>
        </div>
      )}
    </div>
  );
}
