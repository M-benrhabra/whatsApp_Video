import React from 'react';
import {ScrollView} from 'react-native';
import Categories from '../Categories/Categories';
import StickerComponent from './StikerComponent';

const index = () => {
  return (
    <>
      <ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
        <Categories />
        <StickerComponent />
      </ScrollView>
    </>
  );
};

export default index;
