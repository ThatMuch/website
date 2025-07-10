import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import React, { useState } from "react";

import { CategoryType } from "../../utils/types";
import PostCard from "../PostCard/PostCard";
import { useBlogCategories } from "../../hooks/use-blog-categories";
import { useRessources } from "../../hooks/use-ressources";

type Props = {
  title?: string;
  filter?: boolean;
  category?: string;
  isHome?: boolean;
};

export default function AllTemplates({
  title,
  filter,
  category,
  isHome,
}: Props) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const templates = useRessources(category ? category : selectedCategory);
  const postsPerPage: number = 8;
  const totalPages: number = Math.ceil((templates?.length || 0) / postsPerPage);
  const categories: CategoryType[] = useBlogCategories();
  console.log(categories);
  const paginatedPosts = templates?.slice(
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
    <div className="AllTemplates">
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
            Tous les templates
          </button>

          {/* Category Buttons */}
          {categories
            .filter((category) => category?.templates?.nodes.length > 0)
            .filter((category) => category.slug !== "all")
            .map((category) => (
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
          ? paginatedPosts.map((template) => (
              <div key={template?.id}>
                <PostCard
                  image={template?.featuredImage}
                  title={template?.title}
                  category={template?.category}
                  url={`/ressources/templates/${template?.slug}`}
                />
              </div>
            ))
          : templates?.slice(0, 4).map((template) => (
              <div key={template?.id}>
                <PostCard
                  image={template?.featuredImage}
                  title={template?.title}
                  category={template?.category}
                  url={`/ressources/templates/${template?.slug}`}
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
            href="/ressources/templates/"
            className="btn btn-primary"
            onClick={() => setCurrentPage(1)}
            aria-label="Voir tous les templates"
            title="Lien vers tous les templates gratuits"
          >
            Voir tous les templates
          </a>
        </div>
      )}
    </div>
  );
}
