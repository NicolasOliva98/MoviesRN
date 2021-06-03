import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import HomeScren from '../screens/Home'
import DetailsScreen from '../screens/Details'

const Stack = createStackNavigator();

function MainNavigator() {
    return (
        <Stack.Navigator
            headerMode='none'
            initialRouteName="Home"
        >
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
        </Stack.Navigator>
    );
}
export default MainNavigator
