import React, { useEffect, useState } from 'react'
import { FlatList, ImageBackground, Image, ScrollView } from 'react-native'
import { Div as View, Text } from 'react-native-magnus'
import { rv, hp, wp } from '../helpers/responsive'
import { useAuthState } from '../context/AuthContext'
import { Loading, Header } from '../components'
import useAxios from '../api/api'
const Details = ({ navigation, route }) => {
    const { get, URL } = useAxios()
    const { id, item, url } = route.params
    const state = useAuthState()
    const [repart, setRepart] = useState([])
    const [loading, setLoading] = useState(false)

    const getRepart = async () => {
        try {
            setLoading(true)
            const { data } = await get(`${URL}/api/movies/${id}/actors`,{},state.userToken)
            setRepart(data.data)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }
    useEffect(() => {
        getRepart()
        return () => {
        }
    }, [])
    console.log(repart);

    const goBack = () => {
        navigation.goBack()
    }

    const renderItem = ({ item, index }) => {
        return (
            <View key={index} h={140} w={90} m={4}>
                <Image
                    source={{ uri: item.profile_path ? `${url}${item.profile_path}` : 'https://i.imgur.com/ORKOqh4.png' }} style={{
                        width: 90,
                        height: 100,
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        padding: 15,
                    }} />
                <Text color='white' fontWeight='800' textAlign='center'>{item.name}</Text>
            </View>
        )
    }

    return (loading ?
        <Loading
        /> :
        <View flex={1}>
            <Header back={goBack} />
            <View flex={1} bg='black'>
                <ScrollView>
                    <ImageBackground
                        source={{ uri: `${url}${item.backdrop_path}` }} style={{
                            width: wp(100),
                            height: rv(hp(30)),
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                            padding: 15,
                        }}>
                        <View shadow='2xl' shadowColor='black'>
                            <Text color='white' fontWeight='900' fontSize={rv(hp(4))} numberOfLines={1}>{item.original_title}</Text>
                        </View>
                    </ImageBackground>
                    <View my={rv(hp(3))} px={rv(hp(2))} row>
                        <View></View>
                        <Image
                            source={{ uri: `${url}${item.poster_path}` }} style={{
                                width: wp(34),
                                height: rv(hp(36)),
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end',
                                padding: 5,
                                borderRadius: 5
                            }} />
                        <Text color='#ffe' flex={1} ml={rv(hp(2))} fontSize={rv(hp(2.52))} textAlign='justify'>
                            {item.overview}
                        </Text>
                    </View>
                    <View flex={1} ml={rv(hp(2))}>
                        <Text color='#ffe' fontWeight='bold' flex={1} fontSize={rv(hp(4))} textAlign='justify'>Reparto</Text>
                        <FlatList
                            data={repart}
                            horizontal
                            keyExtractor={i => String(i.id)}
                            renderItem={(i, index) => renderItem(i, index)}
                        />
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default Details
