import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const {width, height} = Dimensions.get('window');
const INITIAL_COORINATE = {
  latitude: 37.78825,
  longitude: -122.4324,
};

const Map = ({coordinate = INITIAL_COORINATE}) => {
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.mapView}
      region={{
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        latitudeDelta: 0.004,
        longitudeDelta: 0.004,
      }}>
      <Marker key={1} coordinate={coordinate} />
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  mapView: {
    width: width,
    height: height / 2,
  },
});
