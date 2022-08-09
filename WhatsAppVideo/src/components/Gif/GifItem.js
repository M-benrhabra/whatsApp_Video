import { useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import {StyleSheet, View, Image, Dimensions, Text, FlatList} from 'react-native';
import { baseURL } from '../../constants/BaseURL';
import { CategoryContext } from '../../context/CategoryContext';
import GET_IMAGES from '../../graphql/queries/Images';
import GET_IMAGE_BY_CATEGORY from '../../graphql/queries/ImagesByCategory';
import Card from '../Card';
import CardLoader from '../Content_Loader/CardLoader';
import Share from '../share/Share';
import CardNoVideos from '../Content_Loader/CardNoVideos';

const GifItem = () => {
  const {infos} = useContext(CategoryContext);
  const resStickers = useQuery(GET_IMAGES);
  const resCategoryStickers = useQuery(GET_IMAGE_BY_CATEGORY, {
    variables: {id: infos},
  });

  console.log('testtttttttttttttttttt', infos === null
  ? resStickers?.data?.images?.data
  : resCategoryStickers?.data?.category?.data?.attributes?.images?.data)
 
  const [imagesSticker, setImagesSticker] = useState([])
  useEffect(() => {
    const exactData = infos === null
                      ? resStickers?.data?.images?.data
                      : resCategoryStickers?.data?.category?.data?.attributes?.images?.data
     console.log("exactData", exactData)
    const filterData = exactData?.filter(el => el?.attributes?.picture?.data[0]?.attributes?.ext  === ".gif")
   
    setImagesSticker(filterData);
   
  }, [resStickers,resCategoryStickers]);
  console.log('imagesSticker', imagesSticker)

  if (resStickers.loading || resCategoryStickers.loading) return <CardLoader />;
  if (infos == null && resStickers.error) {
    return <Text>{resStickers.error}</Text>;
  }
  if (infos !== null && resCategoryStickers.error) {
    return <Text>{resCategoryStickers.error}</Text>;
  }

  const renderItem = ({item}) => {
    return (
      <Card>
        <Image
          source={{
            uri: `${baseURL}${item?.attributes?.picture?.data[0]?.attributes?.url}`,
          }}
          style={styles.image}
        />
        <Share />
      </Card>
    );
  };

  return (
    <View style={styles.screen}>
      {imagesSticker?.length > 0 ? (<FlatList
        data={imagesSticker}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      /> )
      : <CardNoVideos />}
    </View>
  );
};

export default GifItem;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
  },
  image: {
    justifyContent: 'center',
    height: 200,
    width: '100%',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
});
