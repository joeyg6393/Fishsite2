import { GraphQLClient } from 'graphql-request';
import type { Post, Category, PostsResponse } from '../types';

const client = new GraphQLClient('https://green-worm-352283.hostingersite.com/graphql', {
  // Add Next.js fetch with revalidation
  fetch: (input: RequestInfo | URL, init?: RequestInit) => {
    return fetch(input, {
      ...init,
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });
  }
});

export async function getPageById(id: number) {
  const query = `
    query GetPageById($id: ID!) {
      page(id: $id, idType: DATABASE_ID) {
        id
        title
        content
        slug
      }
    }
  `;

  return client.request<{ page: { id: string; title: string; content: string; slug: string } }>(query, { id });
}

export async function getPosts() {
  const query = `
    query GetPosts {
      posts(first: 1000) {
        nodes {
          id
          title
          slug
          excerpt
          content
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          author {
            node {
              name
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
  `;

  return client.request<{ posts: { nodes: Post[] } }>(query);
}

interface GetPostsByCategoryParams {
  categorySlug: string;
}

export async function getPostsByCategory({ categorySlug }: GetPostsByCategoryParams) {
  const query = `
    query GetPostsByCategory($categorySlug: String!) {
      posts(where: { categoryName: $categorySlug }, first: 100) {
        nodes {
          id
          title
          slug
          excerpt
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          author {
            node {
              name
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
  `;

  return client.request<PostsResponse>(query, { categorySlug });
}

export async function getPostBySlug(slug: string) {
  const query = `
    query GetPostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        id
        title
        content
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        author {
          node {
            name
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
  `;

  return client.request<{ post: Post }>(query, { slug });
}

export async function getCategories() {
  const query = `
    query GetCategories {
      categories {
        nodes {
          id
          name
          slug
          posts {
            nodes {
              id
              title
              slug
            }
          }
        }
      }
    }
  `;

  return client.request<{ categories: { nodes: Category[] } }>(query);
}
