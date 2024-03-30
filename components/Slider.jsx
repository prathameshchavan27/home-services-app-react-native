import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../Utils/GlobalApi'
import Heading from './Heading';

export default function Slider() {
    const [slider, setSlider] = useState([]);
    useEffect(()=>{
        getSliders();
    },[])
    const getSliders = () =>{
        GlobalApi.getSlider().then(res=>{
            console.log(res.sliders)
            setSlider(res?.sliders)
        })
    }
  return (
    <View>
      {/* <Text style={styles.heading}>Offers For You</Text> */}
      <Heading text='Offers For You'/>
      <FlatList
        data={slider}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index})=>(
            <View style={styles.imageContainer}>
                <Image source={{uri: item?.image?.url}} style={styles.sliderImage}/>
            </View>
        )}    
      />
    </View>
  )
}

const styles = StyleSheet.create({
    heading:{
        fontSize: 20,
        fontFamily: 'outfit-medium',
        marginBottom: 10
    },
    sliderImage:{
        width: 240,
        height: 125,
        borderRadius: 20,
        // objectFit: 'contain'
        objectFit: 'fill'
    },
    imageContainer:{
        marginRight: 20
    }
})