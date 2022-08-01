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
import {useQuery} from '@apollo/client';
import GET_VIDEOS from '../../graphql/queries/Videos';
import {baseURL} from '../../constants/BaseURL';
// import Video from 'react-native-video';

const VideoComponent = () => {
  const {loading, error, data} = useQuery(GET_VIDEOS);
  console.log('data=>data', data);

  const data_ = [
    {
      id: 1,
      src: require('../../assets/images/v31.png'),
      image: '../../assets/images/v31.png',
    },
    {
      id: 2,
      src: require('../../assets/images/v29.png'),
      image: '../../assets/images/v29.png',
    },
    {
      id: 3,
      src: require('../../assets/images/v33.png'),
      image: '../../assets/images/v33.png',
    },
  ];
  const [favoriteList, setFavoriteList] = useState([]);

  const onFavorite = async item => {
    try {
      //   setItemFavorite(item);
      const newFavorite = [...favoriteList, item];
      const jsonValue = JSON.stringify(newFavorite);
      await AsyncStorage.setItem('favoriteList', jsonValue);
      setFavoriteList(newFavorite);
    } catch (e) {
      console.log(e);
    }
    console.log('Done.');
  };

  // function to remove an item from favorite list
  const onRemoveFavorite = async item => {
    try {
      const getFavorite = await AsyncStorage.getItem('favoriteList');
      let favoriteData = JSON.parse(getFavorite);
      const favoriteVideo = await favoriteData.filter(
        e => e.image !== item.image,
      );
      console.log('favoriteVideo=>', favoriteVideo);

      await AsyncStorage.setItem('favoriteList', JSON.stringify(favoriteVideo));
      setFavoriteList(favoriteVideo);
    } catch (e) {
      console.log(e);
    }
  };

  // function to check if an item exists in the favorite list or not
  const ifExists = item => {
    if (favoriteList.filter(el => el.image === item.image).length > 0) {
      return true;
    }
    return false;
  };

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
      <FlatList
        data={data?.videos?.data}
        renderItem={({item}) => {
          return (
            <Card>
              {/* <Video
                source={{
                  uri: `${baseURL}${item?.attributes?.picture?.data[0]?.attributes?.url}`,
                }}
                style={{width: 300, height: 300}}
                controls={true}
                ref={ref => {
                  this.player = ref;
                }}
              /> */}
              <Image
                source={{
                  uri: `${baseURL}${item?.attributes?.picture?.data[0]?.attributes?.url}`,
                }}
                style={styles.image}
              />
              {/* <Share
                onSevedItem={() =>
                  ifExists(item) ? onRemoveFavorite(item) : onFavorite(item)
                }
                ifExists={ifExists(item)}
              /> */}
            </Card>
          );
        }}
      />
    </View>
  );
};

export default VideoComponent;

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
