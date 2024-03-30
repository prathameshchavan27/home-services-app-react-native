import { View, Text, FlatList } from 'react-native'
import GlobalApi from '../Utils/GlobalApi'
import { useUser } from '@clerk/clerk-expo'
import { useEffect, useState } from 'react';
import CategoryBusinessListItem from '../components/CategoryBusinessListItem'

export default function BookingScreen() {
  const {user} = useUser();
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(()=>{
    user&&getUserBookings();
  },[user])
  const getUserBookings = () => {
    setLoading(true);
    GlobalApi.getUserBookings(user?.primaryEmailAddress.emailAddress).then(res=>{
      setBookings(res.bookings);
      setLoading(false);
    })
  }
  return (
    <View style={{padding: 10}}>
      <Text style={{fontFamily: 'outfit-medium', fontSize: 26, paddingVertical:15,marginTop: 25}}>My Bookings</Text>
      <View>
        <FlatList
          data={bookings}
          onRefresh={()=>getUserBookings()}
          refreshing={loading}
          renderItem={({item, index})=>(
            <CategoryBusinessListItem 
              business={item?.businessList}
              booking={item}
            />
          )}
        />
      </View>
    </View>
  )
}