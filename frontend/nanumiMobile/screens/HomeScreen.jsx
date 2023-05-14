import React, {useState, useEffect} from 'react';
import Home from '../components/home/Home';
import {BackHandler, ToastAndroid} from 'react-native';

const HomeScreen = ({navigation}) => {
  const [exitApp, setExitApp] = useState(false);

  const handleBackPress = () => {
    if (exitApp) {
      BackHandler.exitApp();
    } else {
      ToastAndroid.show('한 번 더 누르면 종료됩니다', ToastAndroid.SHORT);
      setExitApp(true);
    }

    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => {
      backHandler.remove();
    };
  }, [exitApp]);

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
