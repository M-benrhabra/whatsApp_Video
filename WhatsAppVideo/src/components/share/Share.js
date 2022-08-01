import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Color from '../../constants/Color';
import Sircle from './Sircle';

const Share = ({onSevedItem, ifExists, ShowFavorite}) => {
  return (
    <View style={styles.row}>
      <Sircle iconName="download" style={{backgroundColor: Color.primary}} />
      {ShowFavorite ? null : (
        <TouchableOpacity onPress={onSevedItem}>
          <Sircle
            iconName={'heart'}
            style={{backgroundColor: ifExists ? Color.red : Color.gray}}
          />
        </TouchableOpacity>
      )}

      <Sircle iconName="share-alt" style={{backgroundColor: Color.blue}} />
      <Sircle iconName="share-alt" style={{backgroundColor: Color.primary}} />
    </View>
  );
};

export default Share;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
