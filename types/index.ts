export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
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
    nodes: {
      name: string;
      slug: string;
    }[];
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  posts?: {
    nodes: {
      id: string;
      title: string;
      slug: string;
    }[];
  };
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  endCursor: string;
  startCursor: string;
}

export interface PostsResponse {
  posts: {
    nodes: Post[];
  };
}