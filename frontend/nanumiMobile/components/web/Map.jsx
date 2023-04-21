import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Alert, PermissionsAndroid} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import useLocationPermission from '../../hooks/useLocationPermission';

const {width, height} = Dimensions.get('window');

const Map = () => {
  const {coordinate} = useLocationPermission();

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
