import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Div as View, Header as Headercustom, Icon, Text } from 'react-native-magnus'
import { rv, hp } from '../helpers/responsive'
import { signOut } from '../services/AuthServices';
import { useAuthDispatch, useAuthState } from '../context/AuthContext';

const Header = ({ back, bg = 'black', color = 'indigo500' }) => {
    const { currentUser } = useAuthState()
    const dispatch = useAuthDispatch()
    const handleSignOut = async () => {
        try {
            await signOut();
            dispatch({ type: 'SIGN_OUT' })
            navigation.navigate('Login')
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <View>
            <Headercustom
                p="md"
                bg={bg}
                color={color}
                alignment='center'
                fontWeight='bold'
                textTransform='capitalize'
                fontSize={rv(hp(3))}
                prefix={
                    back ?
                        <TouchableOpacity onPress={back}>
                            <Icon name="chevron-left" color='indigo500' fontFamily="Feather" fontSize={rv(hp(4.2))} />
                        </TouchableOpacity>
                        : <></>
                }
                suffix={
                    <TouchableOpacity onPress={() => handleSignOut()}>
                        <Icon name='log-out' color='indigo500' fontFamily="Feather" fontSize={rv(hp(3.5))} />
                    </TouchableOpacity>
                }
            >

                <Text fontWeight='bold' fontSize={rv(hp(3.2))} color={color}>
                    {currentUser != null ?
                        currentUser.firstName + ' ' + currentUser.lastName : ''}
                </Text>
            </Headercustom>
        </View>
    )
}

export default Header

