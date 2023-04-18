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

const CATEGORIES = [
  {
    name: '디지털기기',
    id: 'DIGITAL',
    key: 1,
    source: require('../../assets/categories/Digital.png'),
  },
  {
    name: '생활가전',
    id: 'HOMEAPPLIANCES',
    key: 2,
    source: require('../../assets/categories/HomeAppliances.png'),
  },
  {
    name: '가구/인테리어',
    id: 'FURNITURE',
    key: 3,
    source: require('../../assets/categories/Furniture.png'),
  },
  {
    name: '생활/주방',
    id: 'KITCHEN',
    key: 4,
    source: require('../../assets/categories/Kitchen.png'),
  },
  {
    name: '유아동',
    id: 'FEEDINGBOTTLE',
    key: 5,
    source: require('../../assets/categories/FeedingBottle.png'),
  },
  {
    name: '유아도서',
    id: 'CHILDRENBOOK',
    key: 6,
    source: require('../../assets/categories/ChildrenBook.png'),
  },
  {
    name: '여성의류',
    id: 'FEMALECLOTHES',
    key: 7,
    source: require('../../assets/categories/FemaleClothes.png'),
  },
  {
    name: '여성잡화',
    id: 'FEMALEBAG',
    key: 8,
    source: require('../../assets/categories/FemaleBag.png'),
  },
  {
    name: '남성패션/잡화',
    id: 'MALECLOTHES',
    key: 9,
    source: require('../../assets/categories/MaleClothes.png'),
  },
  {
    name: '뷰티/미용',
    id: 'BEAUTY',
    key: 10,
    source: require('../../assets/categories/Beauty.png'),
  },
];

const RenderCategory = ({item, handleCategorySelected}) => {
  console.log(item);
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
