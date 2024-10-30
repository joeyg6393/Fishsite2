import { HttpLink } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'https://green-worm-352283.hostingersite.com/graphql',
    }),
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
      },
    },
  });
});