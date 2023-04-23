import React from 'react';
import BottomTabs from './BottomTabs';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import SearchScreen from '../screens/SearchScreen';
import LoginScreen from './../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import CategoryScreen from '../screens/CategoryScreen';
import PostCreateFormScreen from '../screens/PostCreateFormScreen';
import ChatDetailScreen from '../screens/ChatDetailScreen';
import MapScreen from '../screens/MapScreen';
import ProfileToChatScreen from '../screens/ProfileToChatScreen';
import BlockUserScreen from '../screens/BlockUserScreen';
import MatchingProductScreen from '../screens/MatchingProductScreen';
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
        initialRouteName="Login">
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
        <Stack.Screen name="Detail" component={ProductDetailScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ChatDetail" component={ChatDetailScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="ProfileToChat" component={ProfileToChatScreen} />
        <Stack.Screen name="BlockUser" component={BlockUserScreen} />
        <Stack.Screen
          name="MatchingProduct"
          component={MatchingProductScreen}
        />
        <Stack.Screen
          name="PostCreateForm"
          component={PostCreateFormScreen}
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="Category"
          component={CategoryScreen}
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
