import React from 'react';
import BottomTabs from './BottomTabs';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="BottomTabs">
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
        <Stack.Screen name="Detail" component={ProductDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
