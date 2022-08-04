import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import Card from '../Card';
import Share from '../share/Share';
import VideoPlayer from 'react-native-video-player';
import {baseURL} from '../../constants/BaseURL';
import CardNoVideos from '../Content_Loader/CardNoVideos';

const FavoriteVideo = () => {
  const [favoriteList, setFavoriteList] = useState([]);
  useEffect(async () => {
    const getFavorite = await AsyncStorage.getItem('favoriteList');
    console.log('favorite==>', getFavorite);
    return getFavorite != null
      ? setFavoriteList(JSON.parse(getFavorite))
      : null;
  }, []);
  console.log('favoriteList', favoriteList);
  return (
    <View style={styles.screen}>
      {favoriteList.length > 0 ? (
        <FlatList
          data={favoriteList}
          renderItem={({item}) => {
            return (
              <Card>
                <VideoPlayer
                  video={{
                    uri: `${baseURL}${item?.attributes?.picture?.data[0]?.attributes?.url}`,
                  }}
                  videoWidth={1600}
                  videoHeight={900}
                  autoplay={false}
                  showDuration={true}
                  // thumbnail={{uri: 'https://i.picsum.photos/id/866/1600/900.jpg'}}
                />
                <Share ShowFavorite={false} />
              </Card>
            );
          }}
        />
      ) : (
        <CardNoVideos />
      )}
    </View>
  );
};

export default FavoriteVideo;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
  },
  image: {
    justifyContent: 'center',
    height: 180,
    width: '100%',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
});
