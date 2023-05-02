import React from 'react';
import {View, TextInput, StyleSheet, Pressable} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
import GlobalModal from '../modal/GlobalModal';
import {useModal} from '../../hooks/useModal';

export const ProductTitle = () => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="상품명"
        placeholderTextColor={COLORS.gray}
        style={styles.title}
      />
    </View>
  );
};

export const ProductCategory = ({}) => {
  const {showModal} = useModal();
  const handleOpenCategoryModal = () => {
    showModal({
      modalType: 'CreateCategoryModal',
    });
  };
  return (
    <Pressable style={styles.container} onPress={handleOpenCategoryModal}>
      <TextInput
        placeholder="카테고리"
        placeholderTextColor={COLORS.gray}
        style={styles.category}
        editable={false}
      />
      <GlobalModal />
    </Pressable>
  );
};

export const ProductDesc = () => {
  return (
    <View style={styles.textInputContainer}>
      <TextInput
        placeholder="OO동에 올릴 게시글 내용을 작성해주세요 (나눔 금지 물품은 게시가 제한될 수 있습니다.)"
        placeholderTextColor={COLORS.gray}
        style={[styles.textInput, styles.desc]}
        numberOfLines={6}
        multiline={true}
      />
    </View>
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
  textInputContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1,
    paddingBottom: 0,
  },
  textInput: {
    textAlignVertical: 'top',
  },
  desc: {
    color: COLORS.primary,
    fontFamily: FONTS.medium,
    lineHeight: 32,
  },
});
