import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  Dimensions,
  View,
  Text,
  Image,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Color from '../../constants/Color';

const trendingComponent = () => {
  const dataArray = [
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

  const [layoutWidth, setLayoutWidth] = useState(
    Dimensions.get('window').width,
  );
  useEffect(() => {
    const updateLayout = () => {
      setLayoutWidth(Dimensions.get('window').width);
    };
    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  const renderItem = ({item}) => {
    const viewItem = item.image ? (
      <View style={{...styles.item, width: layoutWidth}}>
        <Image
          source={item.src}
          style={{...styles.video, width: layoutWidth * 0.4}}
        />
        <View>
          <Text
            style={{...styles.title, width: layoutWidth / 3}}
            numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.smallTitle}>actor du video</Text>
          <Text style={styles.views}>23K view</Text>
        </View>
        <FontAwesome5 name="ellipsis-v" size={20} />
      </View>
    ) : (
      <View style={styles.placeholder} />
    );

    return <View>{viewItem}</View>;
  };

  return (
    <FlatList
      data={dataArray}
      keyExtractor={({id}) => id.toString()}
      renderItem={renderItem}
    />
  );
};

export default trendingComponent;

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  video: {
    height: 120,
  },
  title: {
    fontSize: 20,
    flexGrow: 1,
    flex: 1,
  },
  smallTitle: {
    color: Color.primary,
    fontSize: 16,
  },
  views: {},
  placeholder: {
    backgroundColor: Color.primary,
    height: '100%',
    width: '100%',
  },
});
