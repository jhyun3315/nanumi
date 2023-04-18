import React from 'react';
import {View, TextInput, StyleSheet, Pressable} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';

export const ProductTitle = () => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="상품명"
        placeholderTextColor={COLORS.gray}
        style={[styles.textInput, styles.title]}
      />
    </View>
  );
};

export const ProductCategory = ({navigation, category, setCategory}) => {
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        navigation.navigate('CreateCategory', {setCategory});
      }}>
      <TextInput
        placeholder="카테고리"
        placeholderTextColor={COLORS.gray}
        style={[styles.textInput, styles.category]}
        editable={false}
        value={category}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1,
    margin: 0,
    marginBottom: SIZES.base,
  },
  title: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    lineHeight: 32,
  },
  category: {
    color: COLORS.primary,
    fontFamily: FONTS.medium,
    lineHeight: 24,
  },
});
