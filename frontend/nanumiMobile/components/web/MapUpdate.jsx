import React, {useEffect, useReducer} from 'react';
import axios from 'axios';
import MapView, {Circle, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
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
import {getDisntace} from '../../util/distance';
import {showErrorAlert} from '../../ui/Alert';
import {requsetUpdateCoordinate} from '../../api/user';
import {useRecoilState} from 'recoil';
import {userState} from '../../state/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');
const MAX_DISTANCE = 5000;

const initialState = {
  newCoordinate: {},
  newAddressName: '',
  newCode: '',
};
const source = axios.CancelToken.source();
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_NEW_COORDINATE':
      return {...state, newCoordinate: action.payload};
    case 'SET_NEW_ADDRESS_NAME':
      return {...state, newAddressName: action.payload};
    case 'SET_NEW_CODE':
      return {...state, newCode: action.payload};
    case 'SET_ALL_DATA':
      return {
        ...state,
        newCoordinate: action.payload.coordinate,
        newCode: action.payload.code,
        newAddressName: action.payload.addressName,
      };
    case 'RESET':
      return {
        newCoordinate: {},
        newAddressName: '',
        newCode: '',
      };
    default:
      return state;
  }
};
const MapUpdate = ({navigation}) => {
  const {coordinate, code, addressName} = useLocationPermission();
  const [user, setUser] = useRecoilState(userState);
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleUpdateCoordinate = async () => {
    const response = await requsetUpdateCoordinate(user.userId, {
      addressId: state.newCode,
    });

    if (isMounted) {
      if (response.code === 200) {
        const asyncUser = await AsyncStorage.getItem('user');
        const parsedUser = JSON.parse(asyncUser);
        const updateUser = {
          ...parsedUser,
          addressId: response.result.addressId,
          si: response.result.si,
          gugun: response.result.gugun,
          dong: response.result.dong,
        };
        await AsyncStorage.setItem('user', JSON.stringify(updateUser));
        setUser(updateUser);
        navigation.navigate('BottomTabs', {screen: 'Home'});
      } else {
        showErrorAlert(response.message, navigation);
      }
    }
  };

  const getCityName = async coordinate => {
    try {
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${coordinate.longitude}&y=${coordinate.latitude}`,
        {
          headers: {
            Authorization: `KakaoAK c22bf545a0b497a95ef7e5417534f704`,
          },
          cancelToken: source.token, // 요청에 Cancel token 추가
        },
      );
      const dongCode = response.data.documents[0].code;
      const address = response.data.documents[0].address_name;
      return {dongCode, address};
    } catch (error) {
      if (axios.isCancel(error)) {
        // Cancel token 에러 체크
        console.log('요청이 취소되었습니다.');
      } else {
        Alert.alert('도시 정보를 얻어오는데 실패했습니다.');
      }
    }
  };

  const handleMarkerDragEnd = async event => {
    const region = {
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    const distance = getDisntace(coordinate, region);

    if (distance > MAX_DISTANCE) {
      showErrorAlert('반경5KM 이내만 가능합니다.', navigation, () => {
        dispatch({type: 'SET_NEW_COORDINATE', payload: region});
        dispatch({type: 'SET_NEW_COORDINATE', payload: coordinate});
        dispatch({type: 'SET_NEW_ADDRESS_NAME', payload: addressName});
        dispatch({type: 'SET_NEW_CODE', payload: code});
      });
    } else {
      await handleRegion(region);
    }
  };

  const handleRegion = async region => {
    const result = await getCityName(region);
    if (result) {
      const {dongCode, address} = result;
      dispatch({type: 'SET_NEW_COORDINATE', payload: region});
      dispatch({type: 'SET_NEW_ADDRESS_NAME', payload: address});
      dispatch({type: 'SET_NEW_CODE', payload: dongCode});
    }
  };

  useEffect(() => {
    dispatch({type: 'SET_ALL_DATA', payload: {coordinate, code, addressName}});
  }, [coordinate, addressName, code]);

  if (!state.newCoordinate.latitude || !state.newCoordinate.longitude)
    return <Fallback />;

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader navigation={navigation}>위치수정</BackHeader>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapView}
        region={state.newCoordinate}
        minZoomLevel={12}
        maxZoomLevel={18}>
        <Circle
          center={coordinate}
          radius={5000}
          strokeWidth={2}
          strokeColor={'rgba(158, 158, 255, 1)'}
          fillColor={'rgba(158, 158, 255, 0.3)'}
        />
        <Marker
          key={1}
          coordinate={state.newCoordinate}
          draggable
          onDragEnd={handleMarkerDragEnd}
        />
      </MapView>
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>
          {state.newAddressName ? state.newAddressName : '동네 인증중...'}
        </Text>
        <RectButton
          minWidth={64}
          fontSize={SIZES.font}
          {...SHADOWS.dark}
          handlePress={handleUpdateCoordinate}>
          수정
        </RectButton>
      </View>
    </SafeAreaView>
  );
};

export default MapUpdate;

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
