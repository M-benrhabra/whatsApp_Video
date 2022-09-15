import React from 'react';
import {StyleSheet, TouchableOpacity, View, PermissionsAndroid, Platform} from 'react-native';
import Color from '../../constants/Color';
import Sircle from './Sircle';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob'

const ShareIcons = ({onSevedItem, ifExists, ShowFavorite, media}) => {
  console.log('props=>>>', media)
   // function to share
  const customShare = async () => {
  const shareOptions = {
    url : media
  }
  try {
    const shareResponse = await Share.open(shareOptions)
  } catch (error) {
    console.log('Error =>', error)
  }
  }
  // download
  const checkPermission = async () => {
    if(Platform.OS === 'ios') {
      downloadImage()
    }else{
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download Media'
          }
        )
        if(granted === PermissionsAndroid.RESULTS.GRANTED){
          console.log('Storage permission granted')
          downloadImage()
        }else{
          alert('Storage permission not granted')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  const downloadImage = () =>{
      let date = new Date()
      let url_Image = media
      let ext = getExtention(url_Image)
      ext = '.' + ext[0] 
      const {config, fs} = RNFetchBlob
      let pectureDir = fs.dirs.PictureDir
      let options = {
        fileCache: true,
        addAndroidDownloads:{
          useDownloadManager: true,
          Notification:true,
          path:PictureDir + '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) + ext,
          description: 'Image'
        }
      }
      config(options)
      .fetch('GET', media)
      .then(res => {
        console.log('res ->', JSON.stringify(res))
        alert('Media downloaded successfully')
      })
  }
  const getExtention = filename => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined
  }
  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={checkPermission}>
        <Sircle iconName="download" style={{backgroundColor: Color.primary}} />
      </TouchableOpacity>
      {ShowFavorite ? null : (
        <TouchableOpacity onPress={onSevedItem}>
          <Sircle
            iconName={'heart'}
            style={{backgroundColor: ifExists ? Color.red : Color.gray}}
          />
        </TouchableOpacity>
      )}

      {/* <Sircle iconName="share-alt" style={{backgroundColor: Color.blue}} /> */}
      <TouchableOpacity onPress={customShare}>
        <Sircle iconName="share-alt" style={{backgroundColor: Color.primary}} />
      </TouchableOpacity>
    </View>
  );
};

export default ShareIcons;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
