import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { rv,hp } from '../helpers/responsive'

const Loading = () => {
    return (
        <View style={styles.container}>
            <Text style={{}}>Cargando datos...</Text>
            <ActivityIndicator color='black' size='large' />
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:{
        fontSize:rv(hp(4))
    }
})
