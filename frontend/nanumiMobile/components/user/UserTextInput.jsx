import React, {useState} from 'react';
import {TextInput} from 'react-native';
import {COLORS, SIZES, FONTS} from '../../constants';

const UserTextInput = ({onChangeText, value, ...props}) => {
  const [focused, setFocused] = useState(false);
  return (
    <TextInput
      onFocus={() => {
        setFocused(true);
      }}
      onBlur={() => setFocused(false)}
      onChangeText={onChangeText}
      placeholderTextColor={COLORS.gray}
      value={value}
      secureTextEntry={props.secureTextEntry ? props.secureTextEntry : false}
      style={[
        {
          fontFamily: FONTS.medium,
          fontSize: SIZES.small,
          padding: SIZES.base * 3,
          backgroundColor: COLORS.lightBlue,
          borderRadius: SIZES.base,
          marginVertical: SIZES.base,
        },
        focused && {borderWidth: 1, borderColor: COLORS.blue},
      ]}
      {...props}
    />
  );
};

export default UserTextInput;
