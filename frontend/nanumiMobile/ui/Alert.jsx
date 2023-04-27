import React from 'react';
import {Alert} from 'react-native';

export const showErrorAlert = (message, navigation, onConfirm) => {
  Alert.alert('오류', message, [
    {text: '확인', onPress: onConfirm || (() => navigation.goBack())},
  ]);
};
