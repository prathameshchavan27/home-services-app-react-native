import { View, Text, Image, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '../Utils/Colors';

export default function Header() {
    const {user, isLoading} = useUser();
  return user&&(
    <View style={styles.container}>
        <View style={styles.headerContainer}>
            <View style={styles.profileContainer}>
                <Image style={styles.userImage} source={{uri:user?.imageUrl}}/>
                <View>
                    <Text style={[styles.text, {fontFamily: 'outfit'}]}>Welcome,</Text>
                    <Text style={[styles.text, styles.nameText]}>{user?.fullName}</Text>
                </View>   
            </View>
            <FontAwesome name='bookmark-o' size={28} color={Colors.WHITE}/>
        </View>
        <View style={styles.searchBarContainer}>
            <TextInput style={styles.textInput} placeholder='Search'/>
            <FontAwesome style={styles.searchBtn} name='search' size={24} color={Colors.PRIMARY}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        padding: 20,
        paddingTop: 50,
        backgroundColor: Colors.PRIMARY,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25
    },
    headerContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    profileContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    userImage:{
        width: 45,
        height: 45,
        borderRadius: 99
    },
    text:{
        color: Colors.WHITE,
    },
    nameText:{
        fontSize: 20,
        fontFamily: 'outfit-medium'
    },
    searchBarContainer:{
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        marginBottom: 5
    },
    searchBtn:{
        backgroundColor: Colors.WHITE,
        borderRadius: 8,
        padding: 10
    },
    textInput:{
        padding: 8,
        paddingHorizontal: 16,
        backgroundColor: Colors.WHITE,
        borderRadius: 8,
        width: '85%',
        fontSize: 16,
        fontFamily: 'outfit'
    }
})