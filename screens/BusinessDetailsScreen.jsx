import { View, Text, Image, Pressable, StyleSheet, ScrollView, FlatList, Modal, Linking, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../Utils/Colors';
import Heading from '../components/Heading';
import BookingModal from '../components/BookingModal';
export default function BusinessDetailsScreen() {
    const param = useRoute().params;
    const [business, setBusiness] = useState();
    const [isReadMore, setIsReadMore] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigation = useNavigation();
    useEffect(()=>{
        console.log(param?.business);
        param&&setBusiness(param.business);
    },[param])
    const hideModal = () => {
        setShowModal(false);
    }
    const onMessageBtn = () => {
        Linking.openURL('mailto:'+business?.email+'?subject=I am looking for your Service&body=Hi There,');
    }
  return (
    <View>
        <ScrollView style={{height: '91%'}}>
            <Pressable style={styles.backBtnContainer} onPress={()=>navigation.goBack()}>
                <Ionicons name='arrow-back-outline' size={30} color="black"/>
            </Pressable>
            <Image source={{uri: business?.images[0]?.url}} style={{width: '100%', height: 250}}/>
            <View style={styles.infoContainer}>
                <Text style={{fontFamily:'outfit-bold', fontSize:25}}>{business?.name}</Text>
                <View style={styles.subContainer}>
                    <Text style={{fontFamily: 'outfit-medium', fontSize: 20, color: Colors.PRIMARY}}>{business?.contactPerson} 🌟 </Text>
                    <Text style={styles.categoryName}>{business?.category?.name}</Text>
                </View>
                <View style={styles.location}>
                    <Ionicons name="location-sharp" size={25} color={Colors.PRIMARY}/>
                    <Text style={styles.text}>{business?.address}</Text>
                </View>
                <View style={{borderWidth: 1, borderColor: Colors.GRAY, marginVertical: 20}}></View>
                {/* About  */}
                <View>
                    <Heading text={'About Me'}/>
                    <Text style={styles.about} numberOfLines={isReadMore?20:5}>{business?.about}</Text>
                    <Pressable onPress={()=>setIsReadMore(!isReadMore)} style={({pressed})=>pressed && styles.pressed}>
                        <Text style={{fontFamily: 'outfit', fontSize: 16, color: Colors.PRIMARY}}>{isReadMore?'Read Less':'Read More'}</Text>
                    </Pressable>
                </View>
                <View style={{borderWidth: 1, borderColor: Colors.GRAY, marginVertical: 20}}></View>
                {/* Photos */}
                <View>
                    <Heading text={'Photos'}/>
                    <FlatList
                        data={business?.images}
                        numColumns={2}
                        renderItem={({item})=>(
                            <Image source={{uri: item.url}} style={styles.photos}/>
                        )}
                    />
                </View>
            </View>
        </ScrollView>
        <View style={styles.btnContainer}>
            <Pressable style={styles.messageBtn} onPress={onMessageBtn}>
                <Text style={{textAlign: 'center',fontFamily: 'outfit-medium',color: Colors.PRIMARY, fontSize: 18}}>Message</Text>
            </Pressable>
            <Pressable style={styles.bookingBtn} onPress={()=>setShowModal(true)}>
                <Text style={{textAlign: 'center',fontFamily: 'outfit-medium',color: Colors.WHITE, fontSize: 18}}>Book Now</Text>
            </Pressable>
        </View>
        <Modal 
            animationType='slide'
            visible={showModal}
        >
            <BookingModal businessId={business?.id} onPress={hideModal}/>
        </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
    pressed:{
        opacity: 0.7
    },
    backBtnContainer:{
        position: 'absolute',
        zIndex: 10,
        padding: 20,
        marginTop: Platform.OS === 'ios'? 20 : 0
    },
    infoContainer:{
        padding: 20,
        display: 'flex',
        gap: 7
    },
    categoryName:{
        color: Colors.PRIMARY,
        backgroundColor: Colors.PRIMARY_LIGHT, 
        padding: 5,
        borderRadius: 5,
        fontSize: 14,
        fontFamily: 'outfit'
    },
    subContainer:{
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center'
    },
    location:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    text:{
        fontFamily: 'outfit',
        color: Colors.GRAY,
        fontSize: 17
    },
    about:{
        fontFamily: 'outfit',
        color: Colors.GRAY, 
        lineHeight: 28,
        fontSize: 16,
        textAlign: 'justify'
    },
    photos:{
        width: '50%',
        height: 120,
        flex: 1, 
        borderRadius: 15,
        margin: 7
    },
    messageBtn:{
        flex: 1,
        padding: 15,
        backgroundColor: Colors.WHITE,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        borderRadius: 99,
        marginHorizontal: 5
    },
    bookingBtn:{
        flex: 1,
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        borderRadius: 99,
        marginHorizontal: 5
    },
    btnContainer:{
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 15
    }
})