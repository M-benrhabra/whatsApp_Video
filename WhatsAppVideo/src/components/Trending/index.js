import React from 'react'
import { ScrollView } from 'react-native'
import VideoComponent from './VideoComponent'
import Categories from '../Categories/Categories'

const index = () => {
    return (
        <>
        <ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false} >
            <Categories />
            <VideoComponent />
        </ScrollView>
        </>
    )
}

export default index
