import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Color from '../../constants/Color';
import ItemCategories from './ItemCategories';
import GET_CATEGOREIS from '../../graphql/queries/Categories';
import {useQuery} from '@apollo/client';
import {CategoryContext} from '../../context/CategoryContext';

const Categories = () => {
  const [selectedId, setSelectedId] = useState(null);
  const {error, loading, data} = useQuery(GET_CATEGOREIS);
  const {setInfos} = useContext(CategoryContext);

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = setSelectedId(null);
      setInfos(null);
      return unsubscribe;
    }, [data]),
  );
  console.log('selectedId==>', selectedId);

  const renderItem = ({item}) => {
    const backgroundColor =
      item.id === selectedId ? Color.primary : Color.secondary;
    const color = item.id === selectedId ? Color.white : Color.primary;
    return (
      <ItemCategories
        item={item}
        onPress={() => {
          setSelectedId(item.id), setInfos(item.id);
        }}
        backgroundColor={{backgroundColor}}
        iconColor={{color}}
      />
    );
  };
  return (
    <FlatList
      contentContainerStyle={styles.containerFlatList}
      data={data?.categories?.data}
      horizontal
      keyExtractor={item => item.id}
      renderItem={renderItem}
      extraData={selectedId}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default Categories;

const styles = StyleSheet.create({
  containerFlatList: {
    paddingLeft: 16,
    paddingRight: 8,
    marginTop: 15,
  },
});
