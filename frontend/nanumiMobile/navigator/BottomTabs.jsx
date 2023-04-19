import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PostCreateFormScreen from '../screens/PostCreateFormScreen';
import Icon from 'react-native-ionicons';

import {Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {GlobalColors} from '../constants/color';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          position: 'relative',
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
          borderTopRightRadius: Platform.OS === 'ios' ? 0 : 24,
          borderTopLeftRadius: Platform.OS === 'ios' ? 0 : 24,
        },
        tabBarActiveTintColor: GlobalColors.colors.violet500,
        tabBarLabelStyle: {
          fontSize: 14,
        },
        headerShown: false,
        headerStyle: {
          backgroundColor: GlobalColors.colors.white500,
        },
        headerTintColor: GlobalColors.colors.black500,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={({}) => ({
          title: '홈',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={24} />
          ),
        })}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
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
        options={({}) => ({
          title: '게시글 작성',
          tabBarIcon: ({color, size}) => (
            <Icon name="add-circle-outline" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({}) => ({
          title: '프로필',
          tabBarIcon: ({color, size}) => (
            <Icon name="person" color={color} size={size} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;