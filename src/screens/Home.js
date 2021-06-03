import React, { useState, useEffect } from 'react'
import { TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native'
import { Div as View, Text } from 'react-native-magnus'
import { rv, hp, wp } from '../helpers/responsive'
import { Loading, Header } from '../components'
import { useAuthState } from '../context/AuthContext';
import Carousel from 'react-native-snap-carousel';
import { FlatGrid } from 'react-native-super-grid';
import useAxios from '../api/api'

const Home = ({ navigation }) => {
    const state = useAuthState()
    const { get, API } = useAxios()
    const [Movies, setMovies] = useState([])
    const [Populars, setPopulars] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadMovies, setLoadMovies] = useState(false)
    const [loadPopular, setLoadPopular] = useState(false)
    const url = 'https://image.tmdb.org/t/p/w500'

    const [pagesMovies, setPagesMovies] = useState(1)
    const [pagesPopulars, setPagesPopulars] = useState(1)


    const getMovies = async () => {
        try {
            setLoadMovies(true)
            const { data } = await get(API.GET_MOVIES, { page: pagesMovies }, state.userToken)
            setMovies(
                pagesMovies === 1 ? Array.from(data.data) :
                    [...Movies, ...data.data]
            )
            setLoadMovies(false)
        } catch (error) {
            console.log(error);
            setLoadMovies(false)
        }
    }
    const getPopulars = async () => {
        try {
            setLoadPopular(true)
            const { data } = await get(API.GET_POPULARS, { page: pagesMovies }, state.userToken)
            setPopulars(
                pagesPopulars === 1 ? Array.from(data.data) :
                    [...Populars, ...data.data]
            )
            setLoadPopular(false)
        } catch (error) {
            console.log(error);
            setLoadPopular(false)
        }
    }

    const handleMoreMovies = () => {
        setPagesMovies(pagesMovies + 1)
        getMovies();
    }
    const handleMorePopulars = () => {
        setPagesPopulars(pagesPopulars + 1)
        getPopulars();
    }

    useEffect(() => {
        setLoading(true)
        getMovies()
        getPopulars()
        setLoading(false)
        return () => {
        }
    }, [])

    const _RenderItem = ({ item, index }) => {
        return (
            <View key={index}>
                <View row={true} alignItems='center' py={rv(hp(3))}>
                    <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('Details', { id: item.id, item: item, url: url })} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <ImageBackground
                            borderRadius={20}
                            source={{ uri: `${url}${item.backdrop_path}` }} style={{
                                width: rv(wp(93)),
                                height: rv(hp(30)),
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end',
                                padding: 15
                            }}>
                            <View shadow='2xl' shadowColor='black'>
                                <Text color='white' fontWeight='900' fontSize={rv(hp(4))} numberOfLines={1}>{item.original_title}</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const renderSelected = ({ item, index }) => {
        return (
            <View key={index}>
                <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('Details', { id: item.id, item: item, url: url })}>
                    <ImageBackground
                        borderRadius={10}
                        source={{ uri: `${url}${item.backdrop_path}` }} style={{
                            width: rv(wp(40)),
                            height: rv(hp(13)),
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                            padding: 5
                        }}>
                        <View shadow='2xl' shadowColor='black'>
                            <Text color='white' fontWeight='900' fontSize={rv(hp(2.3))} numberOfLines={1}>{item.original_title}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        )
    }

    return (loading ?
        <Loading />
        :
        <View flex={1} bg='black'>
            <Header />
            <View flex={1} bg='black' px={rv(hp(3))}>

                <View>
                    <Text color='white' fontSize={rv(hp(4.6))} fontWeight='bold'>Peliculas de estreno</Text>
                    <Carousel
                        data={Movies}
                        renderItem={_RenderItem}
                        keyExtractor={(item) => String(item.id)}
                        sliderWidth={wp(100)}
                        itemWidth={wp(100)}
                        style={{
                            backgroundColor: 'red'
                        }}
                        onEndReached={() => handleMoreMovies()}
                        onEndReachedThreshold={0}
                        ListFooterComponent={loadMovies ? <ActivityIndicator color='white' /> : null}
                    />
                </View>
                <Text my={rv(hp(2))} color='white' fontSize={rv(hp(4.4))} fontWeight='600'>Peliculas más populares ⭐️</Text>
                <FlatGrid
                    style={{
                        paddingTop: 10
                    }}
                    scrollEnabled={true}
                    itemDimension={rv(hp(20))}
                    data={Populars}
                    spacing={rv(hp(2))}
                    renderItem={(item, index) => renderSelected(item, index)}
                    onEndReached={() => handleMorePopulars()}
                    onEndReachedThreshold={0}
                    ListFooterComponent={loadPopular ? <ActivityIndicator color='white' /> : null}
                />
                {/*     <Button onPress={() => handleSignOut()}>Cerrar sessión</Button> */}

            </View>
        </View>

    )
}

export default Home
