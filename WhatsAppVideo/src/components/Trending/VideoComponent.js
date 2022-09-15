import {useQuery} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import Card from '../Card';
import CardLoader from '../Content_Loader/CardLoader';
import CardNoVideos from '../Content_Loader/CardNoVideos';
import ShareIcons from '../share/ShareIcons';
import GET_TRENDING_VIDEOS from '../../graphql/queries/TrendingVideos';
import GET_TRENDING_BY_CATEGORY from '../../graphql/queries/TrendingByCategory';
import {CategoryContext} from '../../context/CategoryContext';
import VideoPlayer from 'react-native-video-player';
import {baseURL} from '../../constants/BaseURL';

const VideoComponent = () => {
  const [favoriteList, setFavoriteList] = useState([]);
  const {infos} = useContext(CategoryContext);
  const resTrendVideos = useQuery(GET_TRENDING_VIDEOS);
  const resCategory = useQuery(GET_TRENDING_BY_CATEGORY, {
    variables: {id: infos},
  });

  console.log('data=>data', resTrendVideos?.data?.videos?.data);

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
      const favoriteVideo = await favoriteData.filter(e => e.id !== item.id);
      console.log('favoriteVideo=>', favoriteVideo);

      await AsyncStorage.setItem('favoriteList', JSON.stringify(favoriteVideo));
      setFavoriteList(favoriteVideo);
    } catch (e) {
      console.log(e);
    }
  };

  // function to check if an item exists in the favorite list or not
  const ifExists = item => {
    if (favoriteList.filter(el => el.id === item.id).length > 0) {
      return true;
    }
    return false;
  };

  if (resTrendVideos.loading || resCategory.loading) return <CardLoader />;
  if (infos == null && resTrendVideos.error) {
    return <Text>{resTrendVideos.error}</Text>;
  }
  if (infos !== null && resCategory.error) {
    return <Text>{resCategory.error}</Text>;
  }
  return (
    <View style={styles.screen}>
      {(infos == null && resTrendVideos?.data?.videos?.data.length > 0) ||
      (infos !== null &&
        resCategory?.data?.category?.data?.attributes?.videos?.data.length >
          0) ? (
        <FlatList
          data={
            infos == null
              ? resTrendVideos?.data?.videos?.data
              : resCategory?.data?.category?.data?.attributes?.videos?.data
          }
          renderItem={({item}) => {
            console.log('item.id', item?.id);
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
                {/* <Share /> */}
                <ShareIcons
                  onSevedItem={() =>
                    ifExists(item) ? onRemoveFavorite(item) : onFavorite(item)
                  }
                  ifExists={ifExists(item)}
                />
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
