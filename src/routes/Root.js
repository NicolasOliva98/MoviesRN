import React, { useEffect } from 'react'
import { SafeAreaView, StatusBar } from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import LoginScreen from '../screens/Login'
import SplashLoadScreen from '../screens/SplashScreen'
import HomeScren from '../screens/Home'
import DetailsScreen from '../screens/Details'
import { useAuthState, useAuthDispatch } from '../context/AuthContext'
import { checkAuth } from '../services/AuthServices'
const Stack = createStackNavigator();

const RootStack = () => {
    const { isLoading, isSignout, userToken } = useAuthState();
    const dispatch = useAuthDispatch();

    useEffect(() => {
        const bootstrapAsync = async () => {
            let token = null;
            let userData = null;
            try {
                const usuario = await checkAuth();
                const { jwtToken, userCurrent } = usuario;
                token = jwtToken;
                userData = userCurrent
            } catch (e) {
                console.log('error', e);
            }
            dispatch({ type: 'RESTORE_TOKEN', token, userData });
        };
        bootstrapAsync();
    }, [dispatch]);

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === 'android' ? 25 : 0 }}>
            <StatusBar translucent={true} barStyle='dark-content' backgroundColor='transparent' />
            <Stack.Navigator headerMode='none'>
                {isLoading && (
                    <Stack.Screen name="Splash" component={SplashLoadScreen}
                        options={{
                            headerShown: false
                        }}
                    />
                )}
                {!isLoading && userToken == null ? (
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{
                            ...TransitionPresets.ScaleFromCenterAndroid,
                            animationTypeForReplace: isSignout ? 'pop' : 'push'
                        }}
                    />
                ) : (
                    <>
                        <Stack.Screen
                            name="Home"
                            component={HomeScren}
                            options={{
                                ...TransitionPresets.ScaleFromCenterAndroid
                            }}
                        />
                        <Stack.Screen
                            name="Details"
                            component={DetailsScreen}
                            options={{
                                ...TransitionPresets.SlideFromRightIOS
                            }}
                        />
                    </>
                )}
            </Stack.Navigator>
        </SafeAreaView>

    );
}
export default RootStack

