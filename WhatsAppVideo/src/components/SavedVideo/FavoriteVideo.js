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

const FavoriteVideo = () => {
  const [favoriteList, setFavoriteList] = useState([]);
  useEffect(async () => {
    const getFavorite = await AsyncStorage.getItem('favoriteList');
    console.log('favorite==>', getFavorite);
    return getFavorite != null
      ? setFavoriteList(JSON.parse(getFavorite))
      : null;
  }, []);
  return (
    <View style={styles.screen}>
      <FlatList
        data={favoriteList}
        renderItem={({item}) => {
          return (
            <Card>
              <Image source={item.src} style={styles.image} />
              <Share ShowFavorite={false} />
            </Card>
          );
        }}
      />
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
