import {ApolloClient, InMemoryCache} from '@apollo/client';
import {baseURL} from './src/constants/BaseURL';
import { createUploadLink } from 'apollo-upload-client';

const uri = `${baseURL}/graphql`
const client = new ApolloClient({
  link: createUploadLink({uri}),
  cache: new InMemoryCache(),
});

export default client;
