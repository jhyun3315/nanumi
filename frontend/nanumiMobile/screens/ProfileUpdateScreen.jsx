import React from 'react';
import ProfileUpate from '../components/profile/ProfileUpate';

const ProfileUpdateScreen = ({navigation, route}) => {
  const {nickname, profileUrl} = route.params;
  return (
    <ProfileUpate
      navigation={navigation}
      nickname={nickname}
      profileUrl={profileUrl}
    />
  );
};

export default ProfileUpdateScreen;
