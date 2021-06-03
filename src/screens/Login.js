import React, { useState } from 'react'
import { TouchableOpacity, Alert } from 'react-native'
import { Div as View, Text, Icon, Input, Button, Image } from 'react-native-magnus'
import { rv, hp } from '../helpers/responsive'
import { signIn } from '../services/AuthServices';
import { useAuthDispatch } from '../context/AuthContext';
const Login = ({ navigation }) => {

    const [ViewPass, setViewPass] = useState(true)
    const [loadLogin, setLoadLogin] = useState(false)
    const dispatch = useAuthDispatch()
    const [form, setForm] = useState({
        username: '',
        password: ''
    })

    const authentication = async () => {
        const { username, password } = form
        try {
            setLoadLogin(true)
            const user = await signIn(username, password)
            console.log(user);
            dispatch({ type: 'SIGN_IN', token: user.data.payload.token, userData: user.data.user })
            setLoadLogin(false)
            navigation.navigate('Home')
        } catch (error) {
            console.log(error);
            Alert.alert('Error!','Usuario o contraseña incorrectas')
            setLoadLogin(false)
        }
    }

    return (
        <View flex={1} bg='black' px={rv(hp(2))} justifyContent='center'>
            <Text fontWeight='700' my={5} color='indigo700' fontSize={rv(hp(5))} >Bienvenido de nuevo!</Text>
            <Image />
            <View mb={rv(hp(1))}>
                <Text fontWeight='700' my={5} color='white'>Nombre de usuario</Text>
                <Input
                    bg='#3a3a3c'
                    borderColor='#3a3a3c'
                    placeholder='Username'
                    placeholderTextColor='white'
                    color='white'
                    keyboardType='default'
                    value={form.username}
                    autoCapitalize='none'
                    autoCorrect={false}
                    autoCompleteType='name'
                    fontSize={rv(hp(2.7))}
                    onChangeText={text => setForm({ ...form, username: text })}
                    secureTextEntry={false}
                    prefix={<Icon name='user' fontFamily='Feather' color='white' fontSize={rv(hp(3))} />}
                />
            </View>
            <View mb={rv(hp(4))}>
                <Text fontWeight='700' my={5} color='white'>Contraseña </Text>
                <Input
                    bg='#3a3a3c'
                    borderColor='#3a3a3c'
                    placeholder='Password'
                    placeholderTextColor='#fff'
                    color='white'
                    secureTextEntry={ViewPass}
                    keyboardType='default'
                    value={form.password}
                    fontSize={rv(hp(2.7))}
                    onChangeText={text => setForm({ ...form, password: text })}
                    prefix={<Icon name='lock' fontFamily='Feather' color='white' fontSize={rv(hp(3))} />}
                    suffix={
                        <TouchableOpacity onPress={() => setViewPass(!ViewPass)}>
                            <Icon name={ViewPass != false ? 'eye-off' : 'eye'} fontFamily='Feather' color='white' fontSize={rv(hp(3))} />
                        </TouchableOpacity>
                    }
                />
            </View>
            <Button block
                fontWeight='bold'
                bg='indigo700' my={5}
                underlayColor='indigo500'
                fontSize={rv(hp(2.6))}
                onPress={() => authentication()}
                loading={loadLogin}
                loaderColor='white'
            >Ingresar</Button>

        </View>
    )
}

export default Login
