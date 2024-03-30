import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome } from '@expo/vector-icons'
import BookingNavigation from '../Navigation/BookingNavigation'
import ProfileScreen from '../screens/ProfileScreen';
import Colors from '../Utils/Colors';
import HomeNavigation from './HomeNavigation';
const BottomTabs = createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <BottomTabs.Navigator
        screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: Colors.PRIMARY
        }}
    >
        <BottomTabs.Screen name='home' component={HomeNavigation} options={{
            tabBarLabel:({color})=><Text style={{color: color,fontSize: 12,marginTop:-7}}>Home</Text>,
            tabBarIcon:({color,size})=>(
                <FontAwesome name='home' size={size} color={color}/>
            )
        }}/>
        <BottomTabs.Screen name='booking' component={BookingNavigation} options={{
             tabBarLabel:({color})=><Text style={{color: color,fontSize: 12,marginTop:-7}}>Booking</Text>,
             tabBarIcon:({color,size})=>(
                 <FontAwesome name='bookmark' size={size} color={color}/>
             )
        }}/>
        <BottomTabs.Screen name='profile' component={ProfileScreen} options={{
             tabBarLabel:({color})=><Text style={{color: color,fontSize: 12,marginTop:-7}}>Home</Text>,
             tabBarIcon:({color,size})=>(
                 <FontAwesome name='user-circle' size={size} color={color}/>
             )
        }}/>
    </BottomTabs.Navigator>
  )
}