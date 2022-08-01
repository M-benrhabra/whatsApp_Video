import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import Categories from '../Categories/Categories'
import VideoComponent from './VideoComponent'

const HomeComponent = () => {
    return (
        <>
            <ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false} >
                <Categories />
                <VideoComponent />
            </ScrollView>
        </>
    )
}

export default HomeComponent

const styles = StyleSheet.create({})
