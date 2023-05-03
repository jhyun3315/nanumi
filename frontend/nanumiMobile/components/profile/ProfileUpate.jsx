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

const ProfileUpate = ({navigation, nickname, profileUrl}) => {
  const [updateNickname, setUpdateNickname] = useState(nickname);
  const [updateProfileUrl, setUpdateProfileUrl] = useState(profileUrl);
  const [user] = useRecoilState(userState);

  const handleImageSelection = async () => {
    try {
      const response = await openPicker({
        usedCameraButton: false,
        mediaType: 'image',
        doneTitle: '완료',
        selectedAssets: [],
        isExportThumbnail: true,
        maxSelectedAssets: 1,
        isCrop: false,
        usedCameraButton: true,
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

  console.log(updateProfileUrl);
  const handleProfileUpdate = async () => {
    const formData = new FormData();
    formData.append('nickname', updateNickname);
    formData.append('profileUrl', {
      uri: `file://${updateProfileUrl.uri}`,
      type: `image/${updateProfileUrl.type}`,
      name: updateProfileUrl.name,
    });

    console.log('formDat', formData._parts);
    try {
      const response = await requestProfileUpdate(user.userId, formData);
      console.log(response);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.log('error.data', error.response.data);
        console.log('error.stauts', error.response.status);
        console.log('error.header', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('error.request', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log('erro.config', error.config);
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
