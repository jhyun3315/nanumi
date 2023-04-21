import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Alert, PermissionsAndroid} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const {width, height} = Dimensions.get('window');
const INITIAL_COORINATE = {
  latitude: 37.78825,
  longitude: -122.4324,
};

const Map = () => {
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
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        },
        error => {
          Alert.alert('위치정보를 얻어오는데 실패했습니다.');
          console.log(error);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  return (
    <>
      {coordinate.latitude && coordinate.longitude && (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.mapView}
          region={coordinate}>
          <Marker key={1} coordinate={coordinate} />
        </MapView>
      )}
    </>
  );
};

export default Map;

const styles = StyleSheet.create({
  mapView: {
    width: width,
    height: height / 2,
  },
});
