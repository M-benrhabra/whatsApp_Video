import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Card from '../Card';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Color from '../../constants/Color';

const CardNoVideos = () => {
  return (
    <Card>
      <View>
        <FontAwesome5Icon
          style={styles.icon}
          size={85}
          color={Color.secondary}
          name={'folder-open'}
        />
        <Text style={styles.text}>There Is No Videos !!...</Text>
      </View>
    </Card>
  );
};

export default CardNoVideos;

const styles = StyleSheet.create({
  icon: {
    textAlign: 'center',
    marginVertical: 30,
  },
  text: {
    color: Color.primary,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
