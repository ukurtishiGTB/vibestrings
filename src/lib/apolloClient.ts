import { ApolloClient, InMemoryCache } from '@apollo/client';
export const client = new ApolloClient({
    uri:'https://graphql-api-brown.vercel.app/api/graphql',
    cache: new InMemoryCache(),
});