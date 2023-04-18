import React from 'react';
import {View, TextInput, StyleSheet, Pressable} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
import CategoryList from '../modal/CategoryList';

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

export const ProductCategory = ({
  modalVisible,
  setModalVisible,
  selectedCategory,
  handleCategorySelected,
}) => {
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        setModalVisible(true);
      }}>
      <TextInput
        placeholder="카테고리"
        placeholderTextColor={COLORS.gray}
        style={[styles.textInput, styles.category]}
        value={selectedCategory}
        editable={false}
      />
      <CategoryList
        modalVisible={modalVisible}
        handleCategorySelected={handleCategorySelected}
        setModalVisible={setModalVisible}
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
