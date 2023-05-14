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
          paddingHorizontal: SIZES.base * 2,
          paddingVertical: SIZES.base,
          backgroundColor: COLORS.lightBlue,
          borderRadius: 3,
          marginVertical: SIZES.base,
          color: COLORS.primary,

          width: '100%',
        },
        focused && {borderWidth: 1, borderColor: COLORS.blue},
      ]}
      {...props}
    />
  );
};

export default UserTextInput;
