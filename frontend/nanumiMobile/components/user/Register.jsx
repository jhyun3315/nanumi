import React, {useState} from 'react';
import {Text, SafeAreaView, View, Pressable} from 'react-native';
import {COLORS, SIZES, FONTS} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import UserTextInput from './UserTextInput';

const Register = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (key, value) => {
    setUserInfo({
      ...userInfo,
      [key]: value,
    });
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
            회원가입
          </Text>
          <Text
            style={{
              fontSize: SIZES.large,
              color: COLORS.primary,
              fontFamily: FONTS.medium,
              textAlign: 'center',
              maxWidth: '80%',
            }}>
            회원이 되어 물건을 나눠보세요!
          </Text>
        </View>
        <View style={{marginVertical: SIZES.base * 3}}>
          <UserTextInput
            placeholder="이메일"
            value={userInfo.email}
            onChangeText={value => handleInputChange('email', value)}
          />
          <UserTextInput
            placeholder="닉네임"
            value={userInfo.nickname}
            onChangeText={value => handleInputChange('nickname', value)}
          />
          <UserTextInput
            placeholder="비밀번호"
            secureTextEntry={true}
            value={userInfo.password}
            onChangeText={value => handleInputChange('password', value)}
          />
          <UserTextInput
            placeholder="비밀번호 확인"
            secureTextEntry={true}
            value={userInfo.confirmPassword}
            onChangeText={value => handleInputChange('confirmPassword', value)}
          />
        </View>

        <Pressable
          onPress={() => navigation.navigate('Map')}
          style={{
            padding: SIZES.base * 2,
            backgroundColor: COLORS.blue,
            marginVertical: SIZES.base * 3,
            borderRadius: SIZES.base,
            shadowColor: COLORS.blue,
            shadowOffset: {
              width: 0,
              height: SIZES.base,
            },
            shadowOpacity: 0.3,
            shadowRadius: SIZES.base,
            elevation: 5,
          }}>
          <Text
            style={{
              fontFamily: FONTS.bold,
              color: COLORS.white,
              textAlign: 'center',
              fontSize: SIZES.font,
            }}>
            다음
          </Text>
        </Pressable>

        <Pressable
          style={{
            padding: SIZES.base,
          }}
          onPress={() => navigation.navigate('Login')}>
          <Text
            style={{
              fontFamily: FONTS.bold,
              color: COLORS.primary,
              textAlign: 'center',
              fontSize: SIZES.small,
            }}>
            이미 계정이 있으신가요?
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Register;
