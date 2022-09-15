import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Color from '../../constants/Color'

const UploadComponent = () => {
    return (
        <View style={styles.screen} >
            <View style={styles.border}>
            <FontAwesome5 style={styles.icon} name='cloud-upload-alt' size={80} color={Color.gray} backgroundColor='transparent' />
            </View>
            <Text style={styles.text}>Tap To Upload {"\n"}
            your media</Text>
        </View>
    )
}

export default UploadComponent

const styles = StyleSheet.create({
    screen : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    border : {
        width: 150,
        height: 150,
        borderRadius: 150/2,
        borderWidth: 4,
        borderColor: Color.gray,
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        textAlign: 'center',
        color: Color.gray,
        marginTop: 10
    },
    icon: {
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
})
