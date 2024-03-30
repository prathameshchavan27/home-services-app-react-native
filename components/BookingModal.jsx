import { View, Text, StyleSheet, FlatList, Pressable, TextInput, ScrollView, KeyboardAvoidingView, ToastAndroid, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeadingWithBtn from './HeadingWithBtn'
import CalendarPicker from 'react-native-calendar-picker'
import Colors from '../Utils/Colors'
import Heading from './Heading'
import GlobalApi from '../Utils/GlobalApi'
import { useUser } from '@clerk/clerk-expo'
import moment from 'moment'

export default function BookingModal({businessId,onPress}) {
    const [selectedDate, setSelectedDate] = useState();
    const [timeList, setTimeList] = useState();
    const [selectedTime, setSeletedTime] = useState();
    const [note, setNote] = useState('');
    const {user} = useUser();
    useEffect(()=>{
        getTime();
    },[])
    
    const getTime = () => {
        const timeList = []
        for(let i=8;i<12;i++){
            timeList.push({
                time: i+':00 AM'
            })
            timeList.push({
                time: i+':30 AM'
            })
        }
        timeList.push({
            time: 12+':00 PM'
        })
        timeList.push({
            time: 12+':30 PM'
        })
        for(let i=1;i<=7;i++){
            timeList.push({
                time: i+':00 PM'
            })
            timeList.push({
                time: i+':30 PM'
            })
        }
        setTimeList(timeList);
    }
    const handleChange = (enteredText) => {
        setNote(enteredText);
    }
    const createNewBooking = () => {
        if(!selectedTime || !selectedDate){
            ToastAndroid.show('Please select a Time Slot',ToastAndroid.LONG)
            return ;
        }
        const data = {
            userName: user?.fullName,
            userEmail: user?.primaryEmailAddress.emailAddress,
            date: moment(selectedDate).format('DD-MMM-yyyy'),
            time: selectedTime,
            businessId: businessId
        
        }
        GlobalApi.createBooking(data).then(res=>{
            console.log(res);
            ToastAndroid.show('Booking Created Successfully', ToastAndroid.LONG)
            onPress();
        })
    }
  return (
    <ScrollView>
        <KeyboardAvoidingView style={{padding: 20}}>
            <HeadingWithBtn title="Booking" onPress={onPress} style={styles.headingBtn}/>
            <Heading text={'Select Date'}/>
            <View style={styles.calenderContainer}>
                <CalendarPicker 
                    onDateChange={setSelectedDate}
                    width={340}
                    minDate={Date.now()} 
                    todayBackgroundColor={Colors.BLACK}
                    todayTextStyle={{color: Colors.WHITE}}
                    selectedDayColor={Colors.PRIMARY}
                    selectedDayTextColor={Colors.WHITE}
                />
            </View>
            <Heading text={'Select Time Slot'}/>
            <View style={{marginBottom: 20}}>
                <FlatList
                    data={timeList}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item, index})=>(
                        <Pressable onPress={()=>setSeletedTime(item.time)} style={[({pressed})=>pressed && styles.pressed,{marginRight: 10}]}>
                            <Text style={[selectedTime==item.time?styles.selectedTime:styles.unSelectedTime]}>{item.time}</Text>
                        </Pressable>
                    )}
                />
            </View>
            <Heading text={'Add Suggestion'}/>
            <View >
                <TextInput onChangeText={handleChange} value={note} placeholder='Note' numberOfLines={4} multiline={true} style={styles.note}/>
            </View>
            <Pressable onPress={createNewBooking} style={{marginTop: 10}}>
                    <Text style={styles.confirmBtn}>Confirm & Book</Text>
            </Pressable>
        </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    calenderContainer:{
        backgroundColor: Colors.PRIMARY_LIGHT,
        padding: 20,
        borderRadius: 15,
        marginBottom: 20
    },
    headingBtn:{
        marginBottom: 20,
        marginTop: Platform.OS === 'ios'? 25 : 0
    },
    selectedTime:{
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        borderRadius: 20,
        paddingHorizontal: 18,
        backgroundColor: Colors.PRIMARY,
        color: Colors.WHITE
    },
    unSelectedTime:{
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        borderRadius: 20,
        paddingHorizontal: 18,
        color: Colors.PRIMARY
    },
    pressed:{
        opacity: 0.7
    },
    note:{
        borderWidth: 1,
        borderRadius: 15,
        textAlignVertical: 'top',
        padding: 15,
        paddingTop: 15,
        fontSize: 16,
        fontFamily: 'outfit',
        borderColor: Colors.PRIMARY,
        height: Platform.OS==='ios'? 130: null,
    },
    confirmBtn:{
        // borderWidth: 1,
        borderRadius: 20,
        textAlign: 'center',
        fontSize: 17,
        fontFamily: 'outfit-medium',
        backgroundColor: Colors.PRIMARY,
        color: Colors.WHITE,
        padding: 10,
        
    }
})