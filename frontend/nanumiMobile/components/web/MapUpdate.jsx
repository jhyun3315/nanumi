import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
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

const {width, height} = Dimensions.get('window');
const MAX_DISTANCE = 5000;

const MapUpdate = ({navigation}) => {
  const {coordinate, code, addressName} = useLocationPermission();
  const [newCoordinate, setNewCoordinate] = useState({});
  const [newAddressName, setNewAddressName] = useState('');
  const [newCode, setNewCode] = useState('');

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

  const handleMarkerDragEnd = async event => {
    const region = {
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    const distance = getDisntace(coordinate, region);

    if (distance > MAX_DISTANCE) {
      Alert.alert('변경 실패', '반경5KM 이내만 가능합니다. ', [
        {
          text: '확인',
          onPress: () => {
            setNewCoordinate(region);
            setNewCoordinate(coordinate);
            setNewAddressName(addressName);
            setNewCode(code);
          },
          style: 'cancel',
        },
      ]);
    } else {
      await handleRegion(region);
    }
  };

  const handleRegion = async region => {
    const {dongCode, address} = await getCityName(region);
    setNewAddressName(address);
    setNewCoordinate(region);
    setNewCode(dongCode);
  };

  const handlePress = () => {
    navigation.navigate('Profile');
  };

  useEffect(() => {
    setNewCoordinate(coordinate);
    setNewAddressName(addressName);
    setNewCode(code);
  }, [coordinate, addressName, code]);

  if (!newCoordinate.latitude || !newCoordinate.longitude) return <Fallback />;

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader navigation={navigation}>위치수정</BackHeader>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapView}
        region={newCoordinate}
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
          coordinate={newCoordinate}
          draggable
          onDragEnd={handleMarkerDragEnd}
        />
      </MapView>
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>
          {newAddressName ? newAddressName : '동네 인증중...'}
        </Text>
        <RectButton
          minWidth={64}
          fontSize={SIZES.font}
          {...SHADOWS.dark}
          handlePress={handlePress}>
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
