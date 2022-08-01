import React from 'react'
import { StyleSheet, View } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Color from '../../constants/Color'

const Sircle = (props) => {
    const {iconName} = props
    return (
        <View style={{...styles.sircle, ...props.style}}>
            <FontAwesome5 style={styles.icon} size={15} color={Color.white} name={iconName}/>
        </View>
    )
}

export default Sircle

const styles = StyleSheet.create({
    sircle: {
        width: 30,
        height: 30,
        borderRadius: 30/ 2,
        marginRight: 15,
        marginVertical: 15
    },
    icon: {
        textAlign: 'center',
        marginVertical: 6
    }
})
