import React, {useState} from 'react'
import { StyleSheet, View } from 'react-native'
import {
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';

const SettingComponent = () => {
    const [activeNotification, setActiveNotification] = useState(false)
    const toggle = () => {
        setActiveNotification(!activeNotification)
    }
    return (
        <View>
            <TouchableRipple onPress={() => {toggle()}}>
                <View style={styles.preference}>
                    <Text>Receive push notification</Text>
                    <View pointerEvents="none">
                        <Switch value={activeNotification}/>
                    </View>
                </View>
            </TouchableRipple>
        </View>
    )
}

export default SettingComponent

const styles = StyleSheet.create({
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
      },
})
