import "./BlogCategoryFilter.scss";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import React, { useEffect, useState } from "react";

import PostCard from "../PostCard/PostCard";
import { useBlogCategories } from "../../hooks/use-blog-categories";
import { useSitePosts } from "../../hooks/use-site-posts";

const BlogCategoryFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredPosts, setFilteredPosts] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  const posts = useSitePosts();
  const categories = useBlogCategories();

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

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts?.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredPosts?.length / postsPerPage);

  const renderPageNumbers = () => {
    for (let i = 1; i <= totalPages; i++) {
      const isActive = i === currentPage;
      const className = isActive ? "active" : "";
      return (
        <button key={i} onClick={() => setCurrentPage(i)} className={className}>
          {i}
        </button>
      );
    }
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
            {/* {category.count && <span>({category?.count})</span>} */}
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
