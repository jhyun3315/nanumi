import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import {COLORS, Data, SIZES} from '../../constants';
import {productState} from '../../state/product';
import {useRecoilState} from 'recoil';
import {BackHeader} from '../../ui/BackHeader';

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

const Category = () => {
  const navigation = useNavigation();
  const [data, setData] = useRecoilState(productState);
  const handleCategoryClick = categoryKey => {
    const selectedData = Data.filter(item => item.key === categoryKey);
    setData(selectedData);
    navigation.goBack();
  };

  const renderCategory = ({item}) => (
    <Pressable
      style={styles.categoryItem}
      onPress={() => handleCategoryClick(item.key)}>
      <Image
        style={styles.categoryImage}
        source={item.source}
        resizeMode="contain"
      />
      <Text style={styles.categoryName}>{item.name}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader navigation={navigation} />
      <View style={styles.categoryContainer}>
        <FlatList
          data={CATEGORIES}
          keyExtractor={item => `${item.id}`}
          numColumns={3}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          renderItem={renderCategory}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  categoryContainer: {
    paddingHorizontal: SIZES.padding,
    flex: 1,
  },
  categoryItem: {
    flex: 1 / 3,
    alignItems: 'center',
    marginBottom: SIZES.base * 2,
    marginTop: SIZES.base * 2,
  },
  categoryImage: {
    width: 24,
    height: 24,
  },
  categoryName: {
    marginTop: SIZES.base,
    color: COLORS.primary,
  },
});

export default Category;
