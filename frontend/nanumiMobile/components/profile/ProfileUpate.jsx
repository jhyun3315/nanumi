import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  StatusBar,
} from 'react-native';
import {BackHeader} from '../../ui/BackHeader';
import {COLORS, assets, SIZES, FONTS} from '../../constants';
import {RectButton} from '../../ui/Button';
import Icon from 'react-native-ionicons';

const ProfileUpate = ({navigation}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: 'center',
      }}>
      <BackHeader navigation={navigation}>프로필 수정</BackHeader>
      <RectButton
        minWidth={42}
        minHeight={42}
        position={'absolute'}
        borderRadius={SIZES.small / 2}
        right={16}
        top={StatusBar.currentHeight - 12}>
        수정
      </RectButton>
      <View style={styles.profileImage}>
        <Image
          source={assets.person01}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.updateButton}>
          <Icon name="create" size={SIZES.large} color={COLORS.white} />
        </View>
      </View>
      <TextInput
        style={[styles.text, styles.nickname]}
        placeholder="닉네임"
        value="닉네임"
        textAlignVertical="center"
        textAlign="center"
      />
    </SafeAreaView>
  );
};

export default ProfileUpate;

const styles = StyleSheet.create({
  profileImage: {
    width: 85,
    height: 85,
    borderRadius: 100,
    marginHorizontal: SIZES.large,
    marginBottom: SIZES.large,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.font,
    color: COLORS.primary,
  },
  updateButton: {
    position: 'absolute',
    bottom: -3,
    right: -3,
    alignItems: 'center',
    justifyContent: 'center',
    width: SIZES.extraLarge * 1.1,
    height: SIZES.extraLarge * 1.1,
    borderRadius: SIZES.extraLarge,
    backgroundColor: COLORS.primary,
  },
  nickname: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.font,
    borderWidth: 1,
    width: '75%',
    borderColor: COLORS.gray,
    padding: 0,
  },
});
