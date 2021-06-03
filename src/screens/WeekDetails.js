import React, { useEffect, useState } from 'react'
import { Div as View, Text } from 'react-native-magnus'
import { Alert } from 'react-native'
import { rv, hp, wp } from '../helpers/responsive'
import { Loading, Header } from '../components'
import useFetch from '../hooks/useFetch'

const WeekDetails = ({ navigation, route }) => {
    const tittle = route.params.title
    const { item, id, type } = route.params
    const [Indicators, setIndicators] = useState([])
    const { response, loading, error } = useFetch({ method: 'GET', url: `/api/${id}` });
    useEffect(() => {
        if (response != null) {
            setIndicators(response.serie.reverse())
        }
        if (error) {
            Alert.alert('Lo sentimos, ha ocurrido un error',
                error.message, [{
                    text: 'Intentelo, más tarde',
                    onPress:() => goBack()
                }])
        }
    }, [response, error]);

    const goBack = () => {
        navigation.goBack()
    }
    return (loading ?
        <Loading
        /> :
        <View flex={1}>
            <Header tittle={tittle} back={goBack} />
            <View flex={1} bg='white' px={rv(hp(3))}>
                <View
                    mt={rv(hp(2))}
                    bg='white'
                    rounded='2xl'
                    shadow='md'
                >
                    <View my={rv(hp(2))} alignItems='center'>
                        <Text fontWeight='bold' fontSize={rv(hp(5))} color='blue700'>{`${type === 'Porcentaje' ? '%' : '$'}${item.valor}`}</Text>
                    </View>
                    <View mx={20} my={rv(hp(2))} alignItems='center' row>
                        <Text fontWeight='600' fontSize={rv(hp(2.8))}>Nombre </Text>
                        <Text ml={rv(hp(3))} fontSize={rv(hp(2.4))}>{item.nombre}</Text>
                    </View>
                    <View mx={20} my={rv(hp(2))} alignItems='center' row>
                        <Text fontWeight='600' fontSize={rv(hp(2.8))}>Fecha</Text>
                    </View>
                    <View mx={20} my={rv(hp(2))} alignItems='center' row>
                        <Text fontWeight='600' fontSize={rv(hp(2.8))}>Unidad de medida</Text>
                        <Text ml={rv(hp(3))} fontSize={rv(hp(2.4))}>{item.unidad_medida}</Text>
                    </View>
                </View>
                {
                    Indicators.length <= 0 ? <Text>Cargando datos...</Text> :
                        <>
                            <Text color='blue700' fontSize={rv(hp(4))} mt={rv(hp(3))}>Grafico de unidad</Text>
                            <View justifyContent='center' alignItems='center' >
                               
                            </View>
                        </>
                }
            </View>
        </View>
    )
}

export default WeekDetails
