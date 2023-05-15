import React, {useState, useEffect, useCallback} from 'react';
import {BackHandler, ToastAndroid} from 'react-native';
import Home from '../components/home/Home';

const HomeScreen = ({navigation}) => {
  const [exitApp, setExitApp] = useState(false);

  const handleBackPress = useCallback(() => {
    if (navigation.isFocused()) {
      // 홈 스크린에서만 동작하도록 체크
      if (exitApp) {
        BackHandler.exitApp();
      } else {
        ToastAndroid.show('한 번 더 누르면 종료됩니다', ToastAndroid.SHORT);
        setExitApp(true);
      }
      return true;
    }
    return false; // 다른 화면에서는 기본 뒤로가기 동작 유지
  }, [exitApp, navigation]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => {
      backHandler.remove();
    };
  }, [handleBackPress]);

  useEffect(() => {
    let timerId;
    if (exitApp) {
      timerId = setTimeout(() => {
        setExitApp(false);
      }, 2000);
    }
    return () => clearTimeout(timerId);
  }, [exitApp]);

  return <Home navigation={navigation} />;
};

export default HomeScreen;
