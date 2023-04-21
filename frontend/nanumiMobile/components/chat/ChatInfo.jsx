import React from 'react';
import {View} from 'react-native';
import {MoreHeader} from '../../ui/BackHeader';

export const ChatHeader = ({navigation, handlePresentModalPress}) => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
      <MoreHeader
        navigation={navigation}
        handlePresentModalPress={handlePresentModalPress}
      />
    </View>
  );
};
