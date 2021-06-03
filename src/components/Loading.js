import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { rv,hp } from '../helpers/responsive'

const Loading = () => {
    return (
        <View style={styles.container}>
            <Text style={{color:'white'}}>Cargando datos...</Text>
            <ActivityIndicator color='white' size='large' />
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:{
        fontSize:rv(hp(4))
    }
})
