import React, {useState, useEffect} from 'react'
import { TouchableOpacity } from 'react-native'
import { Div as View, Header as Headercustom, Icon } from 'react-native-magnus'
import { rv, hp } from '../helpers/responsive'
import * as SecureStore from 'expo-secure-store';

const Header = ({ tittle, back, bg = 'white', color = 'blue700' }) => {
    const [user, setUser] = useState({})
    const getUser = async () => {
        const datos = await SecureStore.getItemAsync('userdata')
        let usuario = JSON.parse(datos);
        setUser(usuario.data.user)
    }

    useEffect(() => {
        getUser()
        return () => {
        }
    }, [])

    console.log();

    return (
        <View>
            <Headercustom
                p="md"
                bg={bg}
                color={color}
                alignment="center"
                fontWeight='bold'
                textTransform='capitalize'
                fontSize={rv(hp(3))}
                prefix={
                    back ?
                        <TouchableOpacity onPress={back}>
                            <Icon name="chevron-left" color='blue700' fontFamily="Feather" fontSize={rv(hp(4.2))} />
                        </TouchableOpacity>
                        : <></>
                }>{user.firstName}</Headercustom>
        </View>
    )
}

export default Header

