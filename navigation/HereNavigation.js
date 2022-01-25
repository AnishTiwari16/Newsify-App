import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import News from '../screen/News';

const Stack = createNativeStackNavigator();

const HereNavigation = () => {
    return (
        <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="News" component={News} />
      </Stack.Navigator>
    </NavigationContainer>
    )
}

export default HereNavigation

const styles = StyleSheet.create({})
