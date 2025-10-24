'use client';

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql',
  }),
  cache: new InMemoryCache(),
});

export default client;

//modo de invocar client con apollo para el uso de Router de Next.js
//import client from '@/utils/apolloClient';
