import React from 'react';
import {ScrollView} from 'react-native';
import GifItem from './GifItem';

const Gif = () => {
  return (
    <>
      <ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
        <GifItem />
      </ScrollView>
    </>
  );
};

export default Gif;
