import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Heading from './Heading'
import GlobalApi from '../Utils/GlobalApi'
import BusinessListItem from './BusinessListItem';

export default function BusinessList() {
    const [businessList, setBusinessList] = useState([]);
    useEffect(()=>{
        getBusinessList();
    },[])
    const getBusinessList = () => {
        GlobalApi.getBusinessList().then(res=>{
            console.log(res.businessLists);
            setBusinessList(res.businessLists)
        })
    }
  return (
    <View style={{marginTop: 20}}>
        <Heading text={'Latest Business'} isViewAll={true} />
        <FlatList
            data={businessList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item,index})=>(
                <View style={{marginRight: 10}}>
                    <BusinessListItem business={item}/>
                </View>
            )}
        />
    </View>
  )
}