import React, {useContext} from 'react';
import {StyleSheet, View, Image, FlatList} from 'react-native';
import Card from '../Card';
import Share from '../share/Share';
import {CategoryContext} from '../../context/CategoryContext';
import {useQuery} from '@apollo/client';
import GET_IMAGE_BY_CATEGORY from '../../graphql/queries/ImageSticker';
import GET_IMAGES from '../../graphql/queries/Images';
import CardLoader from '../Content_Loader/CardLoader';
import {baseURL} from '../../constants/BaseURL';

const StickerComponent = () => {
  const {infos} = useContext(CategoryContext);
  const {loading, error, data} =
    infos == null
      ? useQuery(GET_IMAGES)
      : useQuery(GET_IMAGE_BY_CATEGORY, {
          variables: {id: infos},
        });

  if (loading) return <CardLoader />;
  if (error) return <>{error.message}</>;
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
      <FlatList
        data={
          data?.images?.data
            ? data?.images?.data
            : data?.category?.data?.attributes?.images?.data
        }
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
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
