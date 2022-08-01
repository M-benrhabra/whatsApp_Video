import React,{useState} from 'react';
import { View, StyleSheet } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import Color from '../constants/Color';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


export function DrawerContent(props) {
    const [isDarkTheme, setIsDarkTheme] = useState(false)
    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme)
    }

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.InfoSection}>
                        <View style={{marginTop: 15, flex: 1, alignItems: 'center'}}>
                        <Avatar.Icon size={80} icon="whatsapp" 
                        style={{backgroundColor: Color.primary, width: 80, height: 80, borderRadius: 20, marginBottom: 20}} />
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <FontAwesome5 
                                name="home" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <FontAwesome5 
                                name="upload" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Upload Video"
                            onPress={() => {props.navigation.navigate('UploadScreen')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <FontAwesome5 
                                name="heart" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Saved Video"
                            onPress={() => {props.navigation.navigate('SavedVideoScreen')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <FontAwesome5 
                                name="ban" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Remove Ads"
                            onPress={() => {}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <FontAwesome5 
                                name="cog" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Settings"
                            onPress={() => {props.navigation.navigate('SettingScreen')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <FontAwesome5 
                                name="star" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Rate Us"
                            onPress={() => {}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <FontAwesome5 
                                name="share-alt" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Share This App"
                            onPress={() => {}}
                        />
                    </Drawer.Section>
                    <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={isDarkTheme}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    InfoSection: {
      borderBottomColor: '#f4f4f4',
      borderBottomWidth: 1
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });