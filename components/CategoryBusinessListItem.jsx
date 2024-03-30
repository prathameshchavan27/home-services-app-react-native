import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../Utils/Colors'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'

export default function CategoryBusinessListItem({business, booking}) {
    const navigation = useNavigation();
  return (
    <Pressable style={styles.container} onPress={()=>navigation.push('business-detail',{business: business})}>
        <Image style={styles.image} source={{uri: business?.images[0]?.url}}/>
        <View style={styles.itemContainer}>
            <Text style={styles.text}>{business.contactPerson}</Text>
            <Text style={styles.nameText}>{business.name}</Text>
            {!booking?.id?<View style={styles.location}>
                <Ionicons name="location-sharp" size={20} color={Colors.PRIMARY} style={{marginRight: 5}}/>
                <Text style={styles.text}>{business.address}</Text>
            </View>
            :<Text style={[styles.bookingStatus,
                booking?.bookingStatus=='Completed'?{backgroundColor:Colors.LIGHT_GREEN, color: Colors.GREEN}:
                booking?.bookingStatus=='Canceled'?{backgroundColor:Colors.LIGHT_RED, color: Colors.RED}:{backgroundColor:Colors.PRIMARY_LIGHT, color: Colors.PRIMARY}]}
            >{booking?.bookingStatus}</Text>
            }
            {booking?.id?
                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <AntDesign name='calendar' size={20} color={Colors.PRIMARY}/>
                    <Text style={{fontFamily: 'outfit', color: Colors.GRAY, fontSize:16, marginLeft:5}}>
                        {booking.date} at {booking.time}
                    </Text>
                </View>
                :
                null
            }
        </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container:{
        padding: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        marginBottom: 15,
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },  
    itemContainer:{
        display: 'flex',
        gap: 8
    },
    image:{
        width: 100,
        height: 100,
        borderRadius: 15
    },
    location:{
        display: 'flex',
        flexDirection: 'row'
    },
    text:{
        fontFamily: 'outfit',
        color: Colors.GRAY,
        fontSize: 15
    },
    nameText:{
        fontFamily: 'outfit-bold',
        fontSize: 18
    },
    bookingStatus:{
        padding: 5, 
        borderRadius: 5,
        fontSize: 14,
        alignSelf:'flex-start'
    }
})