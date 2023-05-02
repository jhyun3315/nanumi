import React, {useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useLocationPermission} from '../../hooks/useLocationPermission';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Alert,
} from 'react-native';
import {Fallback} from '../../ui/Fallback';
import {SIZES, SHADOWS, COLORS, FONTS} from '../../constants';
import {BackHeader} from '../../ui/BackHeader';
import {RectButton} from '../../ui/Button';
import {requestSignup} from '../../api/user';
import {showErrorAlert} from '../../ui/Alert';

const {width, height} = Dimensions.get('window');
const Map = ({navigation, userInfo}) => {
  const {email, nickname, password} = userInfo;
  const {coordinate, code, addressName} = useLocationPermission();

  // 회원가입
  const handlePress = async () => {
    const data = {
      email: email,
      nickname: nickname,
      password: password,
      addressId: code,
    };

    const response = await requestSignup(data);
    if (response.code === 200) {
      navigation.navigate('Home');
    } else {
      showErrorAlert('회원가입에 실패했습니다.', navigation);
    }
  };

  // Suspense를 사용 못하므로 직접 구현
  if (!coordinate.latitude || !coordinate.longitude || !code)
    return <Fallback />;

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader navigation={navigation}>위치설정</BackHeader>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapView}
        region={coordinate}>
        <Marker key={1} coordinate={coordinate} />
      </MapView>
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>
          {addressName ? addressName : '동네 인증중...'}
        </Text>
        <RectButton
          minWidth={120}
          fontSize={SIZES.font}
          {...SHADOWS.dark}
          handlePress={handlePress}>
          회원가입
        </RectButton>
      </View>
    </SafeAreaView>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  mapView: {
    width: width,
    height: height / 2,
  },
  bottomContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  bottomText: {
    width: '100%',
    fontFamily: FONTS.medium,
    fontSize: SIZES.font,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    textAlign: 'center',
    marginBottom: SIZES.large * 3,
  },
});
