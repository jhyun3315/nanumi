import React from 'react';
import {
  Modal,
  View,
  Dimensions,
  Text,
  Pressable,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {COLORS, FONTS, SIZES, assets} from '../../constants';
import {useModal} from '../../hooks/useModal';
import {RectButton} from '../../ui/Button';

const {width, height} = Dimensions.get('window');

const USERS = [
  {
    id: '1',
    name: 'gg',
    profileImage: assets.person01,
  },
  {
    id: '2',
    name: 'ss',
    profileImage: assets.person02,
  },
  {
    id: '3',
    name: 'gg',
    profileImage: assets.person03,
  },
];

const MatchingUserModal = () => {
  const {hideModal} = useModal();

  return (
    <Modal visible={true} transparent={true}>
      <Pressable style={styles.modalContainer} onPress={hideModal}>
        <TouchableWithoutFeedback
          onPress={event => event.stopPropagation()}
          style={{zIndex: 1, flex: 1}}>
          <View style={styles.modal}>
            {USERS?.map(user => (
              <View key={user.id} style={styles.userContanier}>
                <Image
                  source={user?.profileImage}
                  style={styles.profileImage}
                />
                <View style={styles.infoContainer}>
                  <Text style={styles.subText}>{user?.name}</Text>
                  <RectButton minWidth={64} fontSize={FONTS.font}>
                    채팅하기
                  </RectButton>
                </View>
              </View>
            ))}
          </View>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
};
export default MatchingUserModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '80%',
    height: height / 3,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.base,
    padding: SIZES.extraLarge,
    position: 'absolute',
    zIndex: 1,
    top: '50%',
    left: '50%',
    transform: [{translateX: -0.4 * width}, {translateY: -0.15 * height}],
    justifyContent: 'space-between',
  },
  userContanier: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: SIZES.extraLarge * 2,
    height: SIZES.extraLarge * 2,
    borderRadius: SIZES.extraLarge,
    marginRight: SIZES.base,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subText: {
    fontFamily: FONTS.medium,
    color: COLORS.primary,
    fontSize: SIZES.font,
  },
});
