import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import HomeScreen from '../screens/HomeScreen';
import TrendingScreen from '../screens/TrendingScreen';
import StickerScreen from '../screens/StickerScreen';
import GifScreen from '../screens/GifScreen';
import Color from '../constants/Color';

const Tab = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();
const TrendingStack = createStackNavigator();
const StickerStack = createStackNavigator();
const GifStack = createStackNavigator();

const MainTabScreen = () => {
    return (
        <Tab.Navigator
      initialRouteName="Home"
      activeColor= {Color.primary}
      inactiveColor={Color.inactive}
      barStyle={{ backgroundColor: Color.white }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="home" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="Trending"
        component={TrendingStackScreen}
        options={{
          tabBarLabel: 'Trending',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="youtube" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="Sticker"
        component={StickerStackScreen}
        options={{
          tabBarLabel: 'Sticker',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="smile" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="Gif"
        component={GifStackScreen}
        options={{
          tabBarLabel: 'Gif',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="photo-video" color={color} size={22} />
          ),
        }}
      />
    </Tab.Navigator>
    )
}

export default MainTabScreen

const HomeStackScreen = ({navigation}) => (
    <HomeStack.Navigator
    screenOptions={{headerStyle: { backgroundColor: Color.primary } }}
    >
        <HomeStack.Screen
        name='Home'
        component={HomeScreen}
        options={{ headerLeft: () => (
            <Icon.Button name='menu' size={25} backgroundColor={Color.primary}
            onPress={()=> navigation.openDrawer()}></Icon.Button>
        ) }}
        />
    </HomeStack.Navigator>
);
const TrendingStackScreen = ({navigation}) => (
    <TrendingStack.Navigator
    screenOptions={{headerStyle: { backgroundColor: Color.primary } }}
    >
        <TrendingStack.Screen
        name='Trending'
        component={TrendingScreen}
        options={{ headerLeft: () => (
            <Icon.Button name='menu' size={25} backgroundColor={Color.primary}
            onPress={()=> navigation.openDrawer()}></Icon.Button>
        ) }}
        />
    </TrendingStack.Navigator>
);
const StickerStackScreen = ({navigation}) => (
    <StickerStack.Navigator
    screenOptions={{headerStyle: { backgroundColor: Color.primary } }}
    >
        <StickerStack.Screen
        name='Sticker'
        component={StickerScreen}
        options={{ headerLeft: () => (
            <Icon.Button name='menu' size={25} backgroundColor={Color.primary}
            onPress={()=> navigation.openDrawer()}></Icon.Button>
        ) }}
        />
    </StickerStack.Navigator>
);
const GifStackScreen = ({navigation}) => (
    <GifStack.Navigator
    screenOptions={{headerStyle: { backgroundColor: Color.primary } }}
    >
        <GifStack.Screen
        name='Gif'
        component={GifScreen}
        options={{ headerLeft: () => (
            <Icon.Button name='menu' size={25} backgroundColor={Color.primary}
            onPress={()=> navigation.openDrawer()}></Icon.Button>
        ) }}
        />
    </GifStack.Navigator>
);