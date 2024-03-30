import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import GlobalApi from '../Utils/GlobalApi';
import CategoryBusinessListItem from '../components/CategoryBusinessListItem';
import Colors from '../Utils/Colors';
import HeadingWithBtn from '../components/HeadingWithBtn';

export default function BusinessListByCategory() {
  const param = useRoute().params;
  const navigation = useNavigation();
  useEffect(()=>{
    param && getBusinessByCategory();
  },[param])
  const [businessLists, setBusinessLists] = useState([]);
  const getBusinessByCategory = () => {
    GlobalApi.getBusinessListByCategory(param.category).then(res=>{
      console.log(res.businessLists)
      setBusinessLists(res.businessLists)
    })
  }
  const navback = () => {
    navigation.goBack();
  }
  console.log(businessLists);
  return (
    <View style={{padding: 10, paddingTop: 50}}>
      <HeadingWithBtn title={param.category} onPress={navback}/>
      {businessLists.length>0 ? <FlatList
        data={businessLists}
        style={{marginTop: 15}}
        renderItem={({item, index})=>(
          <CategoryBusinessListItem business={item}/>
        )}
      /> : 
      <Text style={{fontFamily: 'outfit-medium',color: Colors.GRAY, fontSize:20, textAlign:'center', marginTop:'20%'}}>No Business Found</Text>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  category:{
    fontSize: 25,
    fontFamily: 'outfit-medium'
  },
  listItem:{
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  }
})