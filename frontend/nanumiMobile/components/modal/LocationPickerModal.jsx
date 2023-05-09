import React, {useCallback} from 'react';
import {View, Text, Modal, Dimensions, StyleSheet} from 'react-native';
import {useLocationPermission} from '../../hooks/useLocationPermission';
import {CloseHeader} from '../../ui/BackHeader';
import {Fallback} from '../../ui/Fallback';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {COLORS, FONTS, SHADOWS, SIZES} from '../../constants';
import {getAddressFromCoords} from '../../api/kakao';
import {showErrorAlert} from '../../ui/Alert';
import {RectButton} from '../../ui/Button';
import {useNavigation} from '@react-navigation/native';
import {useModal} from '../../hooks/useModal';

const {width, height} = Dimensions.get('window');

const LocationPickerModal = () => {
  const navigation = useNavigation();
  const {modal, hideModal} = useModal();

  const {coordinate, setCoordinate, addressName, setAddressName} =
    useLocationPermission();

  const handleRegion = useCallback(
    async region => {
      const {address} = await getAddressFromCoords(region);
      if (address) {
        setCoordinate(region);
        setAddressName(address);
      } else {
        showErrorAlert('도시정보를 얻어오는데 실패했습니다.', navigation);
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
    <Modal
      visible={modal?.modalProps?.visible}
      style={styles.container}
      animationType="slide">
      <CloseHeader handlePress={hideModal}>거래장소선택</CloseHeader>
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
        <RectButton
          minWidth={96}
          fontSize={SIZES.font}
          {...SHADOWS.dark}
          isDisable={false}
          handlePress={() => modal?.modalProps?.onConfirm(coordinate)}>
          장소확정
        </RectButton>
      </View>
    </Modal>
  );
};

export default LocationPickerModal;

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
