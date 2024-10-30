import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
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