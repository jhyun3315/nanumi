import React from 'react';
import UserList from './UserList';

const BlockUser = ({navigation}) => {
  return <UserList navigation={navigation} desc="차단해제" />;
};

export default BlockUser;
