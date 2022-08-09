import React from 'react';
import {ScrollView} from 'react-native';
import GifItem from './GifItem';
import Categories from '../Categories/Categories';

const Gif = () => {
  return (
    <>
      <ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
        <Categories />
        <GifItem />
      </ScrollView>
    </>
  );
};

export default Gif;
