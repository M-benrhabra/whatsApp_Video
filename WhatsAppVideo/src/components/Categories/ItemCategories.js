import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Color from '../../constants/Color';

const ItemCategories = ({item, onPress, backgroundColor, iconColor}) => {
  return (
    <View style={styles.categorie}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.items, backgroundColor]}>
        <FontAwesome5
          name={item?.attributes?.icon_name}
          style={[styles.icon, iconColor]}
          size={20}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{item?.attributes?.title}</Text>
    </View>
  );
};

export default ItemCategories;

const styles = StyleSheet.create({
  categorie: {
    marginVertical: 10,
    marginHorizontal: 3,
    height: 80,
    width: Dimensions.get('window').width / 4,
  },
  items: {
    width: 85,
    height: 45,
    borderRadius: 15,
  },
  icon: {
    textAlign: 'center',
    padding: 10,
  },
  title: {
    color: Color.primary,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 2,
  },
});
