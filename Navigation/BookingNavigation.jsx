import { createStackNavigator } from '@react-navigation/stack'
import BusinessDetailsScreen from '../screens/BusinessDetailsScreen'
import BookingScreen from '../screens/BookingScreen';
const Stack = createStackNavigator();
export default function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false
    }}>
        <Stack.Screen name='booking' component={BookingScreen}/>
        <Stack.Screen name='business-detail' component={BusinessDetailsScreen}/>
    </Stack.Navigator>
  )
}