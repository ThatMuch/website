export type PostType = {
  id: string;
  title: string;
  content?: string;
  date?: string;
  featuredImage: {
    node: {
      mediaItemUrl: string;
      altText: string;
    };
  };
  categories: {
    nodes: [
      {
        slug: string;
        name: string;
      }
    ];
  };
  author?: {
    node: {
      name: string;
      avatar: {
        url: string;
        size: number;
      };
    };
  };
  link: string;
  seo?: {
    metaDesc: string;
    metaKeywords: string;
    title: string;
    twitterDescription: string;
    twitterTitle: string;
  };
};

export type CategoryType = {
  name: string;
  slug: string;
  count?: number;
  templates?: {
    nodes: {
      title: string;
    }[];
  };
};
