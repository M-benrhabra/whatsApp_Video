import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Color from '../../constants/Color'
import Card from '../Card'
import Share from '../share/Share'

const VideoComponent = () => {
          
    return (
        <View style={styles.screen}>
            <Card>
                    <Image source={require('../../assets/images/v19.png')} 
                    style={styles.image} />
                    <Share />
            </Card>
            <Card>
                    <Image source={require('../../assets/images/v39.png')} 
                    style={styles.image} />
                    <Share />
            </Card>
            <Card>
                    <Image source={require('../../assets/images/v38.png')} 
                    style={styles.image} />
                    <Share />
            </Card>
        </View>
    )
}

export default VideoComponent

const styles = StyleSheet.create({
    screen : {
        flex : 1,
        padding : 5,
        alignItems : 'center',
    }, 
    image: {
        justifyContent: 'center',
        height: 180,
        width: '100%',
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6 
    }
   
})

