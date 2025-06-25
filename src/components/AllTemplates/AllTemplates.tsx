import React, { useState } from "react";

import PostCard from "../PostCard/PostCard";
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
  const templates = useRessources();
  return (
    <div className="AllTemplates">
      {title && (
        <>
          <h2 className="DividerTitle">{title}</h2>
          <div className="divider mb-4"></div>
        </>
      )}
      <div className="PostsGrid">
        {templates.map((template) => (
          <div key={template?.id}>
            <PostCard
              image={template?.featuredImage}
              title={template?.title}
              category={template?.category}
              url={`/ressources/template/${template?.slug}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
