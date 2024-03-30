import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Colors from '../Utils/Colors'
import { useOAuth } from '@clerk/clerk-expo';
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '../hooks/warmUpBrowser';
WebBrowser.maybeCompleteAuthSession();
export default function Login() {
    useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
    const onPress = React.useCallback(async () => {
        try {
          const { createdSessionId, signIn, signUp, setActive } =
            await startOAuthFlow();
     
          if (createdSessionId) {
            setActive({ session: createdSessionId });
          } else {
            // Use signIn or signUp for next steps such as MFA
          }
        } catch (err) {
          console.error("OAuth error", err);
        }
    }, []);
  return (
    <View style={styles.container}>
        <Image style={styles.loginImage} source={require('../assets/images/login.png')}/>
        <View style={styles.loginContainer}>
            <Text style={styles.titleText}>Let's Find <Text style={{fontWeight:'bold'}}>Professional Cleaning and repair</Text> Service</Text>
            <Text style={styles.secondText}>Best App to find home services near you</Text>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.buttonText}>Let's Get Started</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center'
    },  
    loginImage:{
        width: 230,
        height: 450,
        marginTop: 70,
        borderWidth: 4,
        borderColor: Colors.BLACK,
        borderRadius: 15
    },
    loginContainer:{
        width: '100%',
        backgroundColor: Colors.PRIMARY,
        height: '70%',
        marginTop: -20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20
    },
    titleText:{
        fontSize: 27,
        color: Colors.WHITE,
        textAlign: 'center'
    },
    secondText:{
        fontSize: 17,
        color: Colors.WHITE,
        textAlign: 'center',
        marginTop: 20
    },
    button:{
        padding: 15,
        backgroundColor: Colors.WHITE,
        borderRadius: 99,
        marginTop: 40
    },
    buttonText:{
        textAlign: 'center',
        fontSize: 17,
        color: Colors.PRIMARY
    }
})