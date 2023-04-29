import React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import {SIZES, COLORS, FONTS} from '../../constants';

const ProductOptions = () => {
  return (
    <View style={styles.optionContainer}>
      <Pressable style={styles.option}>
        <Text style={styles.optionText}>상품수정</Text>
      </Pressable>
      <Pressable style={styles.option}>
        <Text style={styles.optionText}>상품삭제</Text>
      </Pressable>
    </View>
  );
};

export default ProductOptions;

const styles = StyleSheet.create({
  optionContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: SIZES.base * 2,
    paddingHorizontal: SIZES.base * 2,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: SIZES.small,
    borderTopRightRadius: SIZES.small,
  },
  option: {
    width: '100%',
    paddingVertical: SIZES.base * 1.5,
    marginBottom: SIZES.base,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  optionText: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.font,
    color: COLORS.primary,
    textAlign: 'center',
  },
});
