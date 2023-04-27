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
import {COLORS, FONTS, SIZES} from '../../constants';
import {getAddressFromCoords} from '../../api/kakao';

const {width, height} = Dimensions.get('window');

const LocationPicker = ({navigation}) => {
  const {coordinate, setCoordinate, addressName, setAddressName} =
    useLocationPermission();

  const handleRegion = useCallback(
    async region => {
      const address = await getAddressFromCoords(region);
      console.log(address);
      if (address) {
        setCoordinate(region);
        setAddressName(address);
      } else {
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
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>
          {addressName ? addressName : '동네 찾는중...'}
        </Text>
      </View>
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
