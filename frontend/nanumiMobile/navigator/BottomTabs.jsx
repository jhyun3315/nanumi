import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import ChatListScreen from '../screens/ChatListScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PostCreateFormScreen from '../screens/PostCreateFormScreen';
import Icon from 'react-native-ionicons';
import {Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from '../constants';
import Test from '../components/home/Test';

const Tab = createBottomTabNavigator();

const BottomTabs = ({navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 60,
        },
        tabBarActiveTintColor: COLORS.violet,
        tabBarLabelStyle: {
          fontSize: 14,
        },
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: COLORS.white,
        },
        headerTintColor: COLORS.primary,
      }}>
      <Tab.Screen
        name="Home"
        component={Test}
        options={({}) => ({
          title: '홈',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={24} />
          ),
        })}
      />
      <Tab.Screen
        name="ChatList"
        component={ChatListScreen}
        options={({}) => ({
          title: '채팅',
          tabBarIcon: ({color, size}) => (
            <Icon name="chatboxes" color={color} size={size} />
          ),
        })}
      />

      <Tab.Screen
        name="PostCreateForm"
        component={PostCreateFormScreen}
        options={({a}) => ({
          title: '게시글 작성',
          tabBarIcon: ({color, size}) => (
            <Icon name="add-circle-outline" color={color} size={size} />
          ),
        })}
        listeners={() => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('PostCreateForm');
          },
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({}) => ({
          title: '프로필',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="person" color={color} size={size} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
