import {ApolloClient, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://172.24.128.1:1337/graphql',
  cache: new InMemoryCache(),
});

export default client;
