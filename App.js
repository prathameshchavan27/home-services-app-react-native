import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/Login';
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import * as SecureStore from "expo-secure-store";
import TabNavigation from './Navigation/TabNavigation';
const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function App() {
  const [fontsLoaded] = useFonts({
    'outfit': require('./assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('./assets/fonts/Outfit-Bold.ttf')
  })
  return (
    <>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <ClerkProvider 
        tokenCache={tokenCache} 
        publishableKey='pk_test_cHJlbWl1bS1kb3J5LTkxLmNsZXJrLmFjY291bnRzLmRldiQ'
      >
        <View style={styles.container}>
          <SignedIn>
            <NavigationContainer>
              <TabNavigation/>
            </NavigationContainer>
          </SignedIn>
          <SignedOut>
            <Login/>
          </SignedOut>
        </View>
      </ClerkProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingTop: 20,
  },
});
