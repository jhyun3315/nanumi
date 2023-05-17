import React, {useEffect, useState} from 'react';
import {WebView} from 'react-native-webview';
import {Alert, View} from 'react-native';
import {useRecoilState} from 'recoil';
import {userState} from '../../state/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage(document.documentElement.innerText)`;

const KakaoLogin = () => {
  const navigation = useNavigation();
  const [fcmToken, setfcmToken] = useState('');
  const [user, setUser] = useRecoilState(userState);

  const handleGetFcmToken = async () => {
    const token = await AsyncStorage.getItem('fcmtoken');
    setfcmToken(token);
  };

  const handleNavigationStataChange = async newState => {
    if (newState.url.includes('error=access_denied')) {
      navigation.navigate('Login');
    }
  };

  const handleMessage = async event => {
    // WebView에서 받은 데이터 처리
    if (event.nativeEvent.data.length !== 0) {
      if (event.nativeEvent.data.includes('"code"')) {
        const data = JSON.parse(event.nativeEvent.data);
        if (data.result.dong === '') {
          setUser(data.result);
          await AsyncStorage.setItem('user', JSON.stringify(data.result));
          navigation.navigate('MapUpdate');
        } else if (data.code === 200) {
          if (data.code === 200) {
            setUser(data.result);
            await AsyncStorage.setItem('user', JSON.stringify(data.result));
            navigation.navigate('BottomTabs', {screen: 'Home'});
          } else {
            navigation.navigate('Login');
            Alert.alert('로그인에 실패했습니다.');
          }
        }
      } else {
        console.log('활용동의서');
      }
    }
  };

  useEffect(() => {
    handleGetFcmToken();
  }, []);

  return (
    <View style={{flex: 1}}>
      <WebView
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?client_id=059f792c853c89a41b38b2f02b2dacec&redirect_uri=https://k8b103.p.ssafy.io/api/oauth/kakao/callback&state=${fcmToken}&response_type=code`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        onMessage={handleMessage}
        onNavigationStateChange={handleNavigationStataChange}
      />
    </View>
  );
};

export default KakaoLogin;
