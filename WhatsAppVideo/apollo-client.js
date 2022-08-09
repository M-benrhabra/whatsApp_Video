import {ApolloClient, InMemoryCache} from '@apollo/client';
import {baseURL} from './src/constants/BaseURL';

const client = new ApolloClient({
  uri: `${baseURL}/graphql`,
  cache: new InMemoryCache(),
});

export default client;
