export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  author: {
    node: {
      name: string;
    };
  };
  categories: {
    nodes: Category[];
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  posts?: {
    nodes: Post[];
  };
}

export interface PostsData {
  posts: {
    nodes: Post[];
  };
}

export interface CategoriesData {
  categories: {
    nodes: Category[];
  };
}