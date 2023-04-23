import {useEffect, useState} from 'react';
import {PermissionsAndroid, Alert} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

const getCityName = async coordinate => {
  const response = await axios.get(
    `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${coordinate.longitude}&y=${coordinate.latitude}`,
    {
      headers: {
        Authorization: `KakaoAK c22bf545a0b497a95ef7e5417534f704`,
      },
    },
  );
  const dongCode = response.data.documents[0].code;
  const address = response.data.documents[0].address_name;
  return {dongCode, address};
};

const useLocationPermission = () => {
  const [coordinate, setCoordinate] = useState({});
  const [code, setCode] = useState('');
  const [addressName, setAddressName] = useState('');

  const getCityNameFromCoordinate = async () => {
    const {dongCode, address} = await getCityName(coordinate);
    setCode(dongCode);
    setAddressName(address);
  };

  const requestPermissions = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Geolocation.getCurrentPosition(
        async position => {
          setCoordinate({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        },

        error => {
          Alert.alert('위치정보를 얻어오는데 실패했습니다.');
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } else {
      Alert.alert('위치정보를 허용해야 회원가입이 완료됩니다.');
    }
  };

  useEffect(() => {
    if (coordinate.latitude && coordinate.longitude) {
      getCityNameFromCoordinate();
    }
  }, [coordinate]);

  useEffect(() => {
    requestPermissions();
  }, []);

  return {coordinate, code, addressName};
};

export default useLocationPermission;
