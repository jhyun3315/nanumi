import React, {useEffect, useState} from 'react';
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
import {useQuery} from '@tanstack/react-query';
import {requestGetMatchingUsers} from '../../api/product';
import {useRecoilState} from 'recoil';
import {userState} from '../../state/user';
import {Fallback} from '../../ui/Fallback';
import ErrorModal from './ErrorModal';

const {width, height} = Dimensions.get('window');

const MatchingUserModalContent = () => {
  const [user] = useRecoilState(userState);
  const {modal} = useModal();
  const {data, isLoading, error, refetch} = useQuery(
    ['matchingUsers', modal?.modalProps?.productId],
    () => requestGetMatchingUsers(modal?.modalProps?.productId, user.userId),
  );

  if (error) return <ErrorModal handlePress={refetch} />;
  if (isLoading) return <Fallback />;

  return (
    <TouchableWithoutFeedback
      onPress={event => event.stopPropagation()}
      style={{zIndex: 1, flex: 1}}>
      <View style={styles.modal}>
        {data?.result.length === 0 && (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.subText}>매칭된 유저가 없습니다</Text>
          </View>
        )}
        {data?.result?.map(user => (
          <View key={user?.userId} style={styles.userContanier}>
            <Image
              source={{uri: user?.userProfileUrl}}
              style={styles.profileImage}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.subText}>{user?.name}</Text>
              <RectButton
                minWidth={64}
                fontSize={FONTS.font}
                handlePress={modal?.modalProps?.onConfirm}>
                채팅하기
              </RectButton>
            </View>
          </View>
        ))}
      </View>
    </TouchableWithoutFeedback>
  );
};

const MatchingUserModal = () => {
  const {modal, hideModal} = useModal();

  return (
    <Modal
      visible={modal?.modalProps.visible}
      transparent={true}
      statusBarTranslucent={true}
      backgroundColor="transparent"
      animationType="fade">
      <Pressable style={styles.modalContainer} onPress={hideModal}>
        <MatchingUserModalContent />
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
  },
  userContanier: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.extraLarge,
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
