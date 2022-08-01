import React from 'react'
import { StyleSheet, View, TextInput,  } from 'react-native'
import Color from '../constants/Color'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const HeaderComponent = ({navigation}) => {
    return (
        <View style={styles.Head}>
            {/* <TextInput 
            autoCapitalize='none'
            autoCorrect={false}
            status='info'
            placeholder='Search'
            style={styles.input}
            textStyle={{ color: '#000' }}
   
            /> */}
            <FontAwesome5.Button name='bars' color={Color.white} size={25} 
            onPress={()=> navigation.openDrawer()}
            />
            <FontAwesome5 name='grip-horizontal' color={Color.white} size={25} />
        </View>
    )
}

export default HeaderComponent

const styles = StyleSheet.create({
    Head: {
        width: '100%',
        height: 50,
        backgroundColor: Color.primary,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    HeadTitle: {
        color: Color.white,
        fontSize: 20
    },
    input:{
        borderRadius: 25,
        backgroundColor: Color.secondary,
        width: 300,
        height: 38,
        marginHorizontal: 8,
        marginVertical: 5
    },
})
