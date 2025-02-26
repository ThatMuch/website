import "./BlogCategoryFilter.scss";

import { CategoryType, PostType } from "../../utils/types";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import React, { useEffect, useState } from "react";

import PostCard from "../PostCard/PostCard";
import { useBlogCategories } from "../../hooks/use-blog-categories";
import { useSitePosts } from "../../hooks/use-site-posts";

const BlogCategoryFilter: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filteredPosts, setFilteredPosts] = useState<PostType[] | undefined>(
    []
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage: number = 8;

  const posts: PostType[] = useSitePosts();
  const categories: CategoryType[] = useBlogCategories();

  useEffect(() => {
    setFilteredPosts(posts);
  }, []);

  useEffect(() => {
    setFilteredPosts(
      selectedCategory
        ? posts.filter((post) =>
            post.categories.nodes.some((cat) => cat.name === selectedCategory)
          )
        : posts
    );
    setCurrentPage(1);
  }, [selectedCategory]);

  const indexOfLastPost: number = currentPage * postsPerPage;
  const indexOfFirstPost: number = indexOfLastPost - postsPerPage;
  const currentPosts: PostType[] | undefined = filteredPosts?.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const totalPages: number = Math.ceil(
    (filteredPosts?.length || 0) / postsPerPage
  );

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
    <div className="BlogCategoryFilter">
      <h2 className="DividerTitle">Catégories</h2>
      <div className="divider mb-4"></div>
      <div className="BlogCategoryFilter_list">
        {/* All Posts Button */}
        <button
          className={`BlogCategoryFilter_list_button ${
            !selectedCategory && "active"
          }`}
          onClick={() => setSelectedCategory("")}
        >
          Tous les articles
          <span>({posts?.length})</span>
        </button>

        {/* Category Buttons */}
        {categories.map((category) => (
          <button
            key={category.slug}
            className={`BlogCategoryFilter_list_button ${
              selectedCategory === category.name && "active"
            }`}
            onClick={() => setSelectedCategory(category.name)}
          >
            {category.name}
            {category.count && <span>({category?.count})</span>}
          </button>
        ))}
      </div>

      <div className="PostsGrid">
        {currentPosts?.map((post, index) => (
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
  );
};

export default BlogCategoryFilter;
