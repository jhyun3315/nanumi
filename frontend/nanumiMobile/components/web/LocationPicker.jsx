import React, {useMemo, useCallback} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Alert,
} from 'react-native';
import {useLocationPermission} from '../../hooks/useLocationPermission';
import {BackHeader} from '../../ui/BackHeader';
import {Fallback} from '../../ui/Fallback';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import axios from 'axios';

const {width, height} = Dimensions.get('window');

const LocationPicker = ({navigation}) => {
  const {coordinate, setCoordinate, addressName, setAddressName} =
    useLocationPermission();

  const handleRegion = useCallback(
    async region => {
      try {
        const response = await axios.get(
          `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${region.longitude}&y=${region.latitude}`,
          {
            headers: {
              Authorization: `KakaoAK c22bf545a0b497a95ef7e5417534f704`,
            },
          },
        );
        const address = response.data.documents[0].address_name;
        setCoordinate(region);
        setAddressName(address);
      } catch (error) {
        Alert.alert('도시 정보를 얻어오는데 실패했습니다.');
        navigation.goBack();
      }
    },
    [navigation],
  );

  const handleMarkerDragEnd = useCallback(
    async event => {
      const region = {
        latitude: event.nativeEvent.coordinate.latitude,
        longitude: event.nativeEvent.coordinate.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      await handleRegion(region);
    },
    [handleRegion],
  );

  if (!coordinate.latitude || !coordinate.longitude || !addressName)
    return <Fallback />;

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader navigation={navigation}>거래장소선택</BackHeader>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapView}
        region={coordinate}>
        <Marker
          key={1}
          coordinate={coordinate}
          draggable
          onDragEnd={handleMarkerDragEnd}
        />
      </MapView>
      <Text>{addressName}</Text>
    </SafeAreaView>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapView: {
    width: width,
    height: height / 2,
  },
});
