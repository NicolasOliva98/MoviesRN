import React, { useState, useEffect } from 'react'
import { TouchableOpacity, FlatList, Alert } from 'react-native'
import { Div as View, Text, Icon, Button } from 'react-native-magnus'
import { rv, hp } from '../helpers/responsive'
import { Loading, Header } from '../components'
import useFetch from '../hooks/useFetch'
import * as SecureStore from 'expo-secure-store';
import { signOut } from '../services/AuthServices';
import { useAuthDispatch } from '../context/AuthContext';
const Home = ({ navigation, route }) => {
    const dispatch = useAuthDispatch()
    /*  const _RenderItem = ({ item, index }) => {
         return (
             <View key={index}>
                 <View row={true} alignItems='center' py={rv(hp(3))}>
                     <TouchableOpacity onPress={() => navigation.navigate('Details', { id: item.codigo, title: item.nombre, type: item.unidad_medida })} style={{ flexDirection: 'row', alignItems: 'center' }}>
                         <View w={'85%'} ml={rv(hp(1.5))}>
                             <Text fontSize={rv(hp(2.8))} my={3} fontWeight='bold' color='blue700'>{item.nombre}</Text>
                             <Text fontSize={rv(hp(2.6))} my={3} fontWeight='400' >{item.unidad_medida}</Text>
                         </View>
                     </TouchableOpacity>
                     <TouchableOpacity onPress={() => navigation.navigate('Week', { id: item.codigo, title: item.nombre, item: item, type: item.unidad_medida })}>
                         <View row>
                             <Icon name='info' fontFamily='Feather' fontSize={rv(hp(4))} color='blue600' />
                             <Icon name='chevron-right' fontFamily='Feather' fontSize={rv(hp(4))} color='blue600' />
                         </View>
                     </TouchableOpacity>
                 </View>
                 <View h={1} bg='#ccc' />
             </View>
         )
     } */

     const handleSignOut = async () => {
        try {
            await signOut();
            dispatch({ type: 'SIGN_OUT' })
            navigation.navigate('Login')
        } catch (e) {
            console.log(e);
        }
    };

    return (/* loading ?
        <Loading />
        : */
        <View flex={1} bg='black'>
        <Header  /> 
            <View flex={1} bg='gray800' px={rv(hp(3))}>
                {/*  <FlatList
                    data={Indicators}
                    keyExtractor={item => item.codigo}
                    renderItem={(item, index) => _RenderItem(item, index)}
                /> */}
                <Button onPress={() => handleSignOut()}>Cerrar sessión</Button>
            </View>
        </View>

    )
}

export default Home
