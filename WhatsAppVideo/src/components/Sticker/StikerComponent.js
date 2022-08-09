import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Image, FlatList, Text} from 'react-native';
import Card from '../Card';
import Share from '../share/Share';
import {CategoryContext} from '../../context/CategoryContext';
import {useQuery} from '@apollo/client';
import GET_IMAGE_BY_CATEGORY from '../../graphql/queries/ImagesByCategory';
import GET_IMAGES from '../../graphql/queries/Images';
import CardLoader from '../Content_Loader/CardLoader';
import {baseURL} from '../../constants/BaseURL';
import CardNoVideos from '../Content_Loader/CardNoVideos';

const StickerComponent = () => {
  const {infos} = useContext(CategoryContext);
  const resStickers = useQuery(GET_IMAGES);
  const resCategoryStickers = useQuery(GET_IMAGE_BY_CATEGORY, {
    variables: {id: infos},
  });
 
  const [imagesSticker, setImagesSticker] = useState([])
  useEffect(() => {
    const exactData = infos == null
                      ? resStickers?.data?.images?.data
                      : resCategoryStickers?.data?.category?.data?.attributes?.images?.data
    const filterData = exactData?.filter(el => el?.attributes?.picture?.data[0]?.attributes?.ext  === ".png")
    // console.log("filterData", filterData)
    setImagesSticker(filterData);
   
  }, [resStickers,resCategoryStickers]);
  // console.log('imagesSticker', imagesSticker)

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
            uri: `${baseURL}${item?.attributes?.picture?.data[0]?.attributes?.formats?.small?.url}`,
          }}
          style={styles.image}
        />
        <Share />
      </Card>
    );
  };

  return (
    <View style={styles.screen}>
      {imagesSticker?.length > 0 ?
       (<FlatList
        data={imagesSticker}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />) : 
      <CardNoVideos />
      }
    </View>
  );
};

export default StickerComponent;

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
