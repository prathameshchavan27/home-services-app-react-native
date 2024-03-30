import { View, Text, StyleSheet, FlatList, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../Utils/GlobalApi'
import Heading from './Heading';
import Colors from '../Utils/Colors';
import { useNavigation } from '@react-navigation/native';

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const navigation = useNavigation();
    useEffect(()=>{
        getCategories();
    },[])
    const getCategories = () => {
        GlobalApi.getCategories().then(res=>{
            console.log(res.categories)
            setCategories(res?.categories)
        })
    }
  return (
    <View style={{marginTop: 10}}>
        <Heading text='Categories' isViewAll={true}/>
        <FlatList
            data={categories}
            numColumns={4}
            renderItem={({item,index})=>index<=3 && (
                <Pressable onPress={()=>navigation.navigate('business-list',{category:item.name})} style={[({pressed})=> {pressed && styles.pressed},styles.container]}>
                    <View style={styles.iconContainer}>
                        <Image style={styles.iconImage} source={{uri: item?.icon?.url}}/>
                    </View>
                    <Text style={styles.categoryName}>{item?.name}</Text>
                </Pressable>
            )}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center'
    },
    iconImage:{
        width: 30,
        height: 30
    },
    iconContainer:{
        backgroundColor: Colors.LIGHT_GRAY,
        padding: 15,
        borderRadius: 99
    },
    categoryName:{
        fontFamily: 'outfit-medium',
        marginTop: 5
    },
    pressed:{
        opacity: 0.7
    }
})