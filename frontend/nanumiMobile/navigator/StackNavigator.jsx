import React from 'react';
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
import DivideProductScreen from '../screens/DivideProductScreen';
import MapUpdateScreen from '../screens/MapUpdateScreen';
import ReportScreen from '../screens/ReportScreen';
import LocationPickerScreen from '../screens/LocationPickerScreen';
import ReviewScreen from '../screens/ReviewScreen';
import HomeScreen from '../screens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Login">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={ProductDetailScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ChatDetail" component={ChatDetailScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="ProfileToChat" component={ProfileToChatScreen} />
        <Stack.Screen name="BlockUser" component={BlockUserScreen} />
        <Stack.Screen name="Review" component={ReviewScreen} />

        <Stack.Screen name="DivideProduct" component={DivideProductScreen} />
        <Stack.Screen name="MapUpdate" component={MapUpdateScreen} />
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
        <Stack.Screen
          name="Report"
          component={ReportScreen}
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="LocationPicker"
          component={LocationPickerScreen}
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
