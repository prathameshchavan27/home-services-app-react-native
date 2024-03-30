import { View, Text, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import Slider from '../components/Slider'
import Categories from '../components/Categories'
import BusinessList from '../components/BusinessList'

export default function HomeScreen() {
  return (
    <>
      <ScrollView> 
        <Header/>
        <View style={{padding: 15}}>
          <Slider/>
          <Categories/>
          <BusinessList/>
        </View>
      </ScrollView>
    </>
  )
}