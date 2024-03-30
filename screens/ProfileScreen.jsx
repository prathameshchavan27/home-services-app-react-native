import { View, Text, Image, StyleSheet, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useUser } from '@clerk/clerk-expo'
import Colors from '../Utils/Colors'

export default function ProfileScreen() {
  const profileMenu = [
    {
      id:1,
      name: 'Home',
      icon: 'home'
    },
    {
      id:2,
      name: 'My Booking',
      icon: 'bookmark-sharp'
    },
    {
      id:3,
      name: 'Contact Us',
      icon: 'mail'
    },
    {
      id:4,
      name: 'Logout',
      icon: 'log-out'
    }
  ]
  const {user} = useUser();
  return (
    <View>
      <View style={{padding: 20, paddingTop: 40, backgroundColor: Colors.PRIMARY}}>
        <Text style={{fontSize: 30,fontFamily:'outfit-bold',color:Colors.WHITE}}>Profile</Text>
        <View style={styles.profile}>  
          <Image source={{uri: user?.imageUrl}} style={{width: 90, height: 90, borderRadius: 99}}/>
          <Text style={styles.userName}>{user?.fullName}</Text>
          <Text style={styles.email}>{user?.primaryEmailAddress.emailAddress}</Text>
        </View>
      </View>
      <View style={{paddingTop: 50}}>
        <FlatList
          data={profileMenu}
          renderItem={({item, index})=>(
            <View style={styles.menuItem}>
              <Ionicons name={item.icon} size={36} color={Colors.PRIMARY}/>
              <Text style={{fontSize: 20, fontFamily:'outfit'}}>{item.name}</Text>
            </View>
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  profile:{
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 10,
  },
  userName:{
    fontSize: 26,
    marginTop: 8,
    fontFamily: 'outfit-medium',
    color: Colors.WHITE
  },
  email:{
    fontSize: 18,
    marginTop: 8,
    fontFamily: 'outfit-medium',
    color: Colors.WHITE
  },
  menuItem:{
    display: 'flex', 
    flexDirection: 'row', 
    gap: 10, 
    marginVertical: 15, 
    alignItems: 'center',
    marginHorizontal: 40
  }
})