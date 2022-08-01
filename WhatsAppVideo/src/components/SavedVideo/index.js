import React from 'react';
import {ScrollView} from 'react-native';
import FavoriteVideo from './FavoriteVideo';

const SavedVideo = () => {
  return (
    <>
      <ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
        <FavoriteVideo />
      </ScrollView>
    </>
  );
};

export default SavedVideo;
