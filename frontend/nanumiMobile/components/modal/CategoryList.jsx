import React from 'react';
import {
  FlatList,
  StyleSheet,
  Pressable,
  Image,
  Text,
  Modal,
} from 'react-native';
import {COLORS, SIZES, FONTS} from '../../constants';
import {CloseHeader} from '../../ui/BackHeader';
import {CATEGORIES} from '../../constants/theme';

const RenderCategory = ({item, handleCategorySelected}) => {
  return (
    <Pressable
      style={styles.categoryItem}
      onPress={() => {
        handleCategorySelected(item.name);
      }}>
      <Image style={styles.categoryImage} source={item.source} />
      <Text style={styles.categoryName}>{item.name}</Text>
    </Pressable>
  );
};

const CategoryList = ({
  modalVisible,
  setModalVisible,
  handleCategorySelected,
}) => {
  return (
    <Modal
      style={styles.categoryContainer}
      visible={modalVisible}
      animationType="slide">
      <CloseHeader setModalVisible={setModalVisible} />
      <FlatList
        data={CATEGORIES}
        renderItem={({item}) => (
          <RenderCategory
            item={item}
            handleCategorySelected={handleCategorySelected}
          />
        )}
        keyExtractor={item => item.key.toString()}
      />
    </Modal>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  categoryContainer: {
    width: '100%',
    backgroundColor: COLORS.white,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
    paddingHorizontal: SIZES.extraLarge,
  },
  categoryImage: {
    width: SIZES.extraLarge,
    height: SIZES.extraLarge,
    marginBottom: SIZES.base,
    marginRight: SIZES.base,
  },
  categoryName: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.font,
    color: COLORS.primary,
  },
});
