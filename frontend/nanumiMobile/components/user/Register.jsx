import React, {useEffect, useState} from 'react';
import {Text, SafeAreaView, View, Pressable, Alert} from 'react-native';
import {COLORS, SIZES, FONTS} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {requestEmailDuplicateCheck} from '../../api/user';
import {RectButton} from '../../ui/Button';

import UserTextInput from './UserTextInput';

const Register = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({
    email: '',
    validCode: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  });

  const [validCode, setValidCode] = useState('');
  const [isNextButtonDisable, setIsNextButtonDisable] = useState(true);

  const handleInputChange = (key, value) => {
    console.log(userInfo);
    setUserInfo({
      ...userInfo,
      [key]: value,
    });
  };

  useEffect(() => {
    // 유효성 검사를 통해 다음 버튼 활성화 여부를 결정
    if (
      userInfo.validCode === validCode &&
      userInfo.password.length >= 4 &&
      userInfo.password.length <= 16 &&
      userInfo.password === userInfo.confirmPassword
    ) {
      setIsNextButtonDisable(false);
    } else {
      setIsNextButtonDisable(true);
    }
  }, [userInfo, validCode]);
  console.log('렌더링');
  console.log(validCode);
  const checkEmailDuplicate = async email => {
    try {
      const response = await requestEmailDuplicateCheck(email);
      if (response.code === 200) {
        setValidCode(response.result.code);
      } else if (response.code === 400) {
        Alert.alert('이미 존재하는 이메일입니다.');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('이메일 인증에 문제가 발생했습니다.');
    }
  };

  return (
    <SafeAreaView>
      <View
        style={{
          padding: SIZES.base * 3,
        }}>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              fontSize: SIZES.extraLarge,
              color: COLORS.blue,
              fontFamily: FONTS.bold,
              marginVertical: SIZES.base * 2,
            }}>
            회원가입
          </Text>
        </View>
        <View style={{marginVertical: SIZES.base * 3}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <UserTextInput
              placeholder="이메일"
              value={userInfo.email}
              onChangeText={value => handleInputChange('email', value)}
              width={'75%'}
            />

            <RectButton
              minWidth={48}
              borderRadius={3}
              handlePress={() => checkEmailDuplicate(userInfo.email)}>
              중복확인
            </RectButton>
          </View>
          {validCode !== '' && (
            <UserTextInput
              placeholder="인증코드"
              value={userInfo.validCode}
              onChangeText={value => handleInputChange('validCode', value)}
            />
          )}
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
          disabled={isNextButtonDisable}
          onPress={() => navigation.navigate('Map', {userInfo: userInfo})}
          style={{
            padding: SIZES.base * 2,
            backgroundColor: isNextButtonDisable
              ? COLORS.lightBlue
              : COLORS.blue,
            marginVertical: SIZES.base * 3,
            borderRadius: SIZES.base,
            shadowColor: COLORS.primary,
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
