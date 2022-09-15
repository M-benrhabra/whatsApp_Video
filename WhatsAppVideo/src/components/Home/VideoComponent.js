import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import Card from '../Card';
import ShareIcons from '../share/ShareIcons';
import {useQuery} from '@apollo/client';
import GET_VIDEOS from '../../graphql/queries/Videos';
import {baseURL} from '../../constants/BaseURL';
import VideoPlayer from 'react-native-video-player';
import GET_VIDEOS_BY_CATEGORY from '../../graphql/queries/VideosByCategory';
import GET_DOWNLOADS from '../../graphql/queries/Downloads';
import {CategoryContext} from '../../context/CategoryContext';
import CardLoader from '../Content_Loader/CardLoader';
import CardNoVideos from '../Content_Loader/CardNoVideos';

const VideoComponent = () => {
  const [favoriteList, setFavoriteList] = useState([]);
  const [dataApi, setDataApi] = useState([])
  const {infos} = useContext(CategoryContext);
  const resVideos = useQuery(GET_VIDEOS);
  const resCategory = useQuery(GET_VIDEOS_BY_CATEGORY, {
    variables: {id: infos},
  });
  const resDownloads = useQuery(GET_DOWNLOADS);
 // function to add an item from favorite list
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

  
  useEffect(() => {
    if(resVideos || resDownloads){
      const dataa= [...resVideos?.data?.videos?.data, ...resDownloads.data.downloads.data]
      setDataApi(dataa)
    }
  },[resVideos, resDownloads])

  if (resVideos.loading || resCategory.loading || resDownloads.loading) return <CardLoader />;
 
  if (infos == null && resVideos.error) {
    return <Text>{resVideos?.error}</Text>;
  }
  if (infos !== null && resCategory.error) {
    return <Text>{resCategory?.error}</Text>;
  }

  console.log('tttt=>', dataApi)
  return (
    <View style={styles.screen}>
      {(infos == null && resVideos?.data?.videos?.data.length > 0) ||
      (infos !== null &&
        resCategory?.data?.category?.data?.attributes?.videos?.data.length >
          0) ? (
        <FlatList
          data={
            infos == null
              ? dataApi
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
                  media ={`${baseURL}${item?.attributes?.picture?.data[0]?.attributes?.url}`}
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
    height: '100%',
    padding: 5,
    
  },
  image: {
    justifyContent: 'center',
    height: '78%',
    width: '100%',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
