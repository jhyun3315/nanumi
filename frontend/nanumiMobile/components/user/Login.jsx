import React, {useEffect, useState} from 'react';
import {Text, SafeAreaView, View, Pressable, Image, Alert} from 'react-native';
import {COLORS, SIZES, FONTS} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {requestLogin} from '../../api/user';
import {useSetRecoilState} from 'recoil';
import {userState} from '../../state/user';
import UserTextInput from './UserTextInput';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const setUser = useSetRecoilState(userState);
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (key, value) => {
    setUserInfo({
      ...userInfo,
      [key]: value,
    });
  };

  const handleLogin = async () => {
    const data = {
      email: userInfo.email,
      password: userInfo.password,
      fcmToken: '',
    };
    const response = await requestLogin(data);
    if (response.code === 200) {
      setUser(response.result);
      await AsyncStorage.setItem('user', JSON.stringify(response.result));
      setUserInfo({username: '', password: ''});
      navigation.navigate('BottomTabs', {screen: 'Home'});
    } else {
      Alert.alert(response.message);
    }
  };

  return (
    <SafeAreaView>
      <View
        style={{
          padding: SIZES.base * 2,
        }}>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              fontSize: SIZES.extraLarge,
              color: COLORS.blue,
              fontFamily: FONTS.bold,
              marginVertical: SIZES.base * 3,
            }}>
            Login here
          </Text>
          <Text
            style={{
              fontSize: SIZES.large,
              color: COLORS.primary,
              fontFamily: FONTS.medium,
              textAlign: 'center',
              maxWidth: '60%',
            }}>
            나누미에 오신걸 환영합니다.
          </Text>
        </View>
        <View style={{marginVertical: SIZES.base * 3}}>
          <UserTextInput
            placeholder="이메일"
            value={userInfo?.email}
            onChangeText={value => handleInputChange('email', value)}
          />
          <UserTextInput
            placeholder="비밀번호"
            value={userInfo?.password}
            secureTextEntry={true}
            onChangeText={value => handleInputChange('password', value)}
          />
        </View>

        <Pressable
          style={{
            padding: SIZES.base * 2,
            backgroundColor: COLORS.blue,
            marginVertical: SIZES.base * 3,
            borderRadius: SIZES.base,

            elevation: 5,
          }}
          onPress={handleLogin}>
          <Text
            style={{
              fontFamily: FONTS.bold,
              color: COLORS.white,
              textAlign: 'center',
              fontSize: SIZES.font,
            }}>
            로그인
          </Text>
        </Pressable>

        <Pressable
          style={{
            padding: SIZES.base,
          }}
          onPress={() => navigation.navigate('Register')}>
          <Text
            style={{
              fontFamily: FONTS.bold,
              color: COLORS.primary,
              textAlign: 'center',
              fontSize: SIZES.small,
            }}>
            회원가입
          </Text>
        </Pressable>

        {/* <View
          style={{
            marginVertical: SIZES.base * 2,
          }}>
          <Text
            style={{
              fontFamily: FONTS.bold,
              color: COLORS.blue,
              textAlign: 'center',
              fontSize: SIZES.small,
            }}>
            소셜로그인
          </Text>
          <View
            style={{
              marginTop: SIZES.base,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Pressable
              style={{
                padding: SIZES.base,
                backgroundColor: '#FEE500',
                borderRadius: SIZES.base / 2.5,
                marginHorizontal: SIZES.base,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../../assets/images/kakao.png')}
                style={{
                  width: 24,
                  height: 24,
                }}
              />
            </Pressable>
          </View>
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default Login;
