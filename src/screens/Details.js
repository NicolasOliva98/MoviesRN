import React, { useEffect, useState } from 'react'
import { TouchableOpacity, FlatList, Alert, ActivityIndicator } from 'react-native'
import { Div as View, Text, Icon } from 'react-native-magnus'
import { rv, hp } from '../helpers/responsive'
import useFetch from '../hooks/useFetch'
import { Loading, Header } from '../components'

const Details = ({ navigation, route }) => {
    const tittle = route.params.title
    const { id, type } = route.params
    const [Indicators, setIndicators] = useState({})
    const { response, loading, error } = useFetch({ method: 'GET', url: `/api/${id}` });
    useEffect(() => {
        if (response != null) {
            setIndicators(response)
        }
        if (error) {
            Alert.alert('Lo sentimos, ha ocurrido un error',
                error.message, [{
                    text: 'Intentelo, más tarde',
                    onPress: () => goBack()
                }])
        }
    }, [response, error]);

    const goBack = () => {
        navigation.goBack()
    }
    const _RenderItem = ({ item, index }) => {
        return (
            <View key={index}>
                <View row={true} alignItems='center' py={rv(hp(3))}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View w={'50%'}>
                        </View>
                        <View w={'50%'} ml={rv(hp(1.5))} row alignItems='center'>
                            <Icon name={
                                type != 'Porcentaje' ? 'dollar-sign' : 'percent'
                            }
                                fontSize={rv(hp(4))} color={
                                    type != 'Porcentaje' ? 'green600' : 'blue600'
                                } fontFamily='Feather' />
                            <Text ml={rv(hp(2))} fontSize={rv(hp(3))}>{item.valor}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View h={1} bg='#ccc' />
            </View>
        )
    }

    return (loading ?
        <Loading
        /> :
        <View flex={1}>
            <Header tittle={tittle} back={goBack} />
            <View flex={1} bg='white' px={rv(hp(3))}>
                <FlatList
                    data={Indicators.serie}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={(item, index) => _RenderItem(item, index)}
                />
            </View>
        </View>
    )
}

export default Details
