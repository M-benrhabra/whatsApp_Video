import React from 'react';
import {StyleSheet, View, Image, Dimensions} from 'react-native';
import Card from '../Card';
import Share from '../share/Share';

const GifItem = () => {
  return (
    <View style={styles.screen}>
      <Card>
        <Image
          source={require('../../assets/images/v19.png')}
          style={styles.image}
        />
        <Share />
      </Card>
      <Card>
        <Image
          source={require('../../assets/images/v39.png')}
          style={styles.image}
        />
        <Share />
      </Card>
      <Card>
        <Image
          source={require('../../assets/images/v38.png')}
          style={styles.image}
        />
        <Share />
      </Card>
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
    height: 180,
    width: '100%',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
});
