import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Color from '../constants/Color'
import HomeScreen from '../screens/HomeScreen'
import TrendingScreen from '../screens/TrendingScreen'

const Tab = createBottomTabNavigator()

const BottemTabNavigation = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, size, color}) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName= 'home'
                        size= focused ? 25 : 20;
                    }else if (route.name === 'Trending') {
                        iconName = 'youtube';
                        size = focused ? 25 : 20;
                    }
                    return(
                        <FontAwesome5
                        name={iconName}
                        size={size}
                        color={color}
                        />
                    )
                }
            })}
            tabBarOptions={{
                activeTintColor: Color.primary,
                inactiveTintColor: Color.gray,
                activeBackgroundColor: Color.white,
                showLabel:true,
                labelStyle: {fontSize: 14},
                showIcon: true,
            }}
            >
                <Tab.Screen
                name='Home'
                component={HomeScreen}
                />
                <Tab.Screen
                name='Trending'
                component={TrendingScreen}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default BottemTabNavigation

const styles = StyleSheet.create({})
