import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';

const Card = props => {
  return <View style={{...styles.card, ...props.style}}>{props.children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: 'white',
    elevation: 5,
    // padding: 20,
    borderRadius: 6,
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').height / 2.8,
    marginBottom: 15,
  },
});
