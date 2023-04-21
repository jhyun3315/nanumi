import {useEffect, useState} from 'react';
import {PermissionsAndroid, Alert} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const useLocationPermission = () => {
  const [coordinate, setCoordinate] = useState({});

  const requestPermissions = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Geolocation.getCurrentPosition(
        position => {
          console.log(position.coords);
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
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  return {coordinate};
};

export default useLocationPermission;
