import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
} from 'react-native';
import {CreateHeader} from '../../ui/BackHeader';
import {COLORS, SIZES, FONTS} from '../../constants';
import {openPicker} from '@baronha/react-native-multiple-image-picker';
import {generateUniqueKey} from '../../util/uniqueId';
import {useRecoilState} from 'recoil';
import {requestProfileUpdate} from '../../api/user';
import {userState} from '../../state/user';
import Icon from 'react-native-ionicons';
import {showErrorAlert} from '../../ui/Alert';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileUpate = ({navigation, nickname, profileUrl}) => {
  const [updateNickname, setUpdateNickname] = useState(nickname);
  const [updateProfileUrl, setUpdateProfileUrl] = useState(profileUrl);
  const [user, setUser] = useRecoilState(userState);

  const handleImageSelection = async () => {
    try {
      const response = await openPicker({
        mediaType: 'image',
        doneTitle: '완료',
        selectedAssets: [],
        isExportThumbnail: true,
        maxSelectedAssets: 1,
        isCrop: false,
        usedCameraButton: false,
      });
      const path = response.map(image => {
        const nameParts = image.fileName.split('.');
        const format = nameParts[nameParts.length - 1];
        return {
          id: generateUniqueKey(),
          uri: image.realPath,
          name: image.fileName,
          type: format,
        };
      });
      setUpdateProfileUrl(...path);
    } catch (e) {
      console.log(e);
    }
  };

  const handleProfileUpdate = async () => {
    const formData = new FormData();
    formData.append('nickname', updateNickname);
    formData.append('profileUrl', {
      uri:
        typeof updateProfileUrl !== 'string' &&
        updateProfileUrl.uri.startsWith('/storage')
          ? `file://${updateProfileUrl.uri}`
          : updateProfileUrl,

      type:
        typeof updateProfileUrl !== 'string' &&
        updateProfileUrl.uri.startsWith('/storage')
          ? `image/${updateProfileUrl.type}`
          : `image/jpeg`,
      name:
        typeof updateProfileUrl !== 'string' &&
        updateProfileUrl.uri.startsWith('/storage')
          ? updateProfileUrl.name
          : generateUniqueKey(),
    });

    try {
      const response = await requestProfileUpdate(user.userId, formData);
      if (response.code === 200) {
        const asyncUser = await AsyncStorage.getItem('user');
        const parsedUser = JSON.parse(asyncUser);
        const updateUser = {
          ...parsedUser,
          nickname: response.result.nickName,
          userProfileUrl: response.result.profileUrl,
        };
        await AsyncStorage.setItem('user', JSON.stringify(updateUser));
        setUser(updateUser);
        navigation.navigate('BottomTabs', {screen: 'Profile'});
      } else if (response.code === 400)
        showErrorAlert('존재하는 유저가 아닙니다.', navigation);
    } catch (error) {
      showErrorAlert('토큰이 만료됐습니다.', navigation);
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: 'center',
      }}>
      <CreateHeader navigation={navigation} handlePress={handleProfileUpdate}>
        수정
      </CreateHeader>
      <View style={styles.profileImage}>
        <Image
          source={{
            uri:
              typeof updateProfileUrl !== 'string' &&
              updateProfileUrl.uri.startsWith('/storage')
                ? `file:///${updateProfileUrl.uri}`
                : updateProfileUrl,
          }}
          style={styles.image}
          resizeMode="contain"
        />
        <Pressable style={styles.updateButton} onPress={handleImageSelection}>
          <Icon name="create" size={SIZES.large} color={COLORS.white} />
        </Pressable>
      </View>
      <TextInput
        style={[styles.text, styles.nickname]}
        placeholder="닉네임"
        value={updateNickname}
        textAlignVertical="center"
        textAlign="center"
        onChangeText={text => setUpdateNickname(text)}
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
    borderRadius: 100,
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
    borderBottomWidth: 1,
    width: '75%',
    borderColor: COLORS.gray,
    padding: 0,
  },
});
