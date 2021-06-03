import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'


const SplashScreen = () => (
    <View style={styles.container}>
        <ActivityIndicator size='large' color='white' />
        <Text style={styles.text}>Loading...</Text>
    </View>
);

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text:{
        color:'white',
        fontSize:25
    }
});