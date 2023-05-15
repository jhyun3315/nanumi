import React from 'react';
import OtherProfile from '../components/profile/OtherProfile';

const OtherProfileScreen = ({navigation, route}) => {
  const {userId} = route.params;

  return <OtherProfile navigation={navigation} userId={userId} />;
};

export default OtherProfileScreen;
