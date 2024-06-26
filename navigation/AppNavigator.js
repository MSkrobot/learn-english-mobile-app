import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import BookScreen from '../screens/BookScreen';
import TranslationScreen from '../screens/TranslationScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Book" component={BookScreen} />
                <Stack.Screen name="Translation" component={TranslationScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
