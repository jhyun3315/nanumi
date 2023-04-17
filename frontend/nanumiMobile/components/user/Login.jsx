import React, {useState} from 'react';
import {Text, SafeAreaView, View, Pressable, Image} from 'react-native';
import {COLORS, SIZES, FONTS} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import UserTextInput from './UserTextInput';

const Login = () => {
  const navigation = useNavigation();

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
            onChangeText={value => handleInputChange('email', value)}
          />
          <UserTextInput
            placeholder="비밀번호"
            secureTextEntry={true}
            onChangeText={value => handleInputChange('password', value)}
          />
        </View>
        <View>
          <Text
            style={{
              fontFamily: FONTS.medium,
              fontSize: SIZES.font,
              color: COLORS.primary,
              alignSelf: 'flex-end',
            }}>
            비밀번호를 잊으셨나요?
          </Text>
        </View>
        <Pressable
          style={{
            padding: SIZES.base * 2,
            backgroundColor: COLORS.blue,
            marginVertical: SIZES.base * 3,
            borderRadius: SIZES.base,

            elevation: 5,
          }}
          onPress={() => navigation.navigate('BottomTabs')}>
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

        <View
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
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
