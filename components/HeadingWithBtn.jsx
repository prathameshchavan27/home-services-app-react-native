import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
export default function HeadingWithBtn({title, onPress, style}) {
    const navigation = useNavigation();
  return (
    <View style={style}>
        <Pressable onPress={onPress} style={styles.listItem}>
            <Ionicons name='arrow-back-outline' size={30} color="black"/>
            <Text style={styles.category}>{title}</Text>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    category:{
        fontSize: 25,
        fontFamily: 'outfit-medium'
    },
    listItem:{
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    }
})