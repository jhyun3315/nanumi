import React, {useRef} from 'react';
import analytics from '@react-native-firebase/analytics';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import SearchScreen from '../screens/SearchScreen';
import LoginScreen from './../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import PostCreateFormScreen from '../screens/PostCreateFormScreen';
import ChatDetailScreen from '../screens/ChatDetailScreen';
import MapScreen from '../screens/MapScreen';
import BlockUserScreen from '../screens/BlockUserScreen';
import MatchingProductScreen from '../screens/MatchingProductScreen';
import DivideProductScreen from '../screens/DivideProductScreen';
import MapUpdateScreen from '../screens/MapUpdateScreen';
import ReportScreen from '../screens/ReportScreen';
import ReviewScreen from '../screens/ReviewScreen';
import BottomTabs from './BottomTabs';
import ProfileUpdateScreen from '../screens/ProfileUpdateScreen';
import CategoryProductScreen from '../screens/CategoryProductScreen';
import FocusedStatusBar from '../ui/FocusedStatusBar';
import PostUpdateFormScreen from '../screens/PostUpdateFormScreen';
import OtherProfileScreen from '../screens/OtherProfileScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {COLORS} from '../constants';

const Stack = createNativeStackNavigator();

export const navigationRef = React.createRef();

const StackNavigator = () => {
  const routeNameRef = useRef();

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() =>
        (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
      }
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        routeNameRef.current = currentRouteName;
      }}>
      <FocusedStatusBar backgroundColor={COLORS.primary} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Login">
        <Stack.Screen name="BottomTabs" component={BottomTabs} />

        <Stack.Screen
          name="CategoryProduct"
          component={CategoryProductScreen}
        />
        <Stack.Screen name="Detail" component={ProductDetailScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ChatDetail" component={ChatDetailScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="BlockUser" component={BlockUserScreen} />
        <Stack.Screen name="Review" component={ReviewScreen} />
        <Stack.Screen name="DivideProduct" component={DivideProductScreen} />
        <Stack.Screen name="MapUpdate" component={MapUpdateScreen} />
        <Stack.Screen name="ProfileUpdate" component={ProfileUpdateScreen} />
        <Stack.Screen name="OtherProfile" component={OtherProfileScreen} />
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
          name="Report"
          component={ReportScreen}
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />

        <Stack.Screen
          name="PostUpdateForm"
          component={PostUpdateFormScreen}
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const navigate = (name, params) => {
  navigationRef.current?.navigate(name, params);
};

export default StackNavigator;
