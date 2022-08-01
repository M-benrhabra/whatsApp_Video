import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import MainTabScreen from './MainTabStack';
import { DrawerContent } from './DrawerContent';
import Color from '../constants/Color'

import UploadScreen from '../screens/UploadScreen'
import SettingScreen from '../screens/SettingScreen';
import SavedVideoScreen from '../screens/SavedVideoScreen';

const Drawer = createDrawerNavigator();

const UploadStack = createStackNavigator();
const SettingStack = createStackNavigator();
const SavedStack = createStackNavigator();


const DrawerNavigation = ({navigation}) => {
    return (
        <NavigationContainer>
            <Drawer.Navigator screenOptions={{headerStyle: { backgroundColor: Color.primary } }} drawerContent={props => <DrawerContent {...props} />}>
                <Drawer.Screen name='HomeDrawer' component={MainTabScreen} />
                <Drawer.Screen name='UploadScreen' component={UploadStackScreen} />
                <Drawer.Screen name='SettingScreen' component={SettingStackScreen} />
                <Drawer.Screen name='SavedVideoScreen' component={SavedStackScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default DrawerNavigation

const UploadStackScreen = ({navigation}) => (
    <UploadStack.Navigator
    screenOptions={{headerStyle: { backgroundColor: Color.primary } }}
    >
        <UploadStack.Screen
        name='Upload'
        component={UploadScreen}
        options={{ headerLeft: () => (
            <Icon.Button name='menu' size={25} backgroundColor={Color.primary}
            onPress={()=> navigation.openDrawer()}></Icon.Button>
        )
        }}
        />
    </UploadStack.Navigator>
);
const SettingStackScreen = ({navigation}) => (
    <SettingStack.Navigator
    screenOptions={{headerStyle: { backgroundColor: Color.primary } }}
    >
        <SettingStack.Screen
        name='Setting'
        component={SettingScreen}
        options={{ headerLeft: () => (
            <Icon.Button name='menu' size={25} backgroundColor={Color.primary}
            onPress={()=> navigation.openDrawer()}></Icon.Button>
        ) }}
        />
    </SettingStack.Navigator>
);
const SavedStackScreen = ({navigation}) => (
    <SavedStack.Navigator
    screenOptions={{headerStyle: { backgroundColor: Color.primary } }}
    >
        <SavedStack.Screen
        name='Saved Video'
        component={SavedVideoScreen}
        options={{ headerLeft: () => (
            <Icon.Button name='menu' size={25} backgroundColor={Color.primary}
            onPress={()=> navigation.openDrawer()}></Icon.Button>
        ) }}
        />
    </SavedStack.Navigator>
);
