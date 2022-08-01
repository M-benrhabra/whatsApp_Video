import 'react-native-gesture-handler';
import React from 'react';
import DrawerNavigation from './src/navigation/DrawerNavigation';
import client from './apollo-client';
import {ApolloProvider} from '@apollo/client';
import {CategoryProvider} from './src/context/CategoryContext';

const App = () => {
  return (
    <CategoryProvider>
      <ApolloProvider client={client}>
        <DrawerNavigation />
      </ApolloProvider>
    </CategoryProvider>
  );
};

export default App;
