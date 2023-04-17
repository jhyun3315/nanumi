import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  Pressable,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import {COLORS, SIZES, assets} from '../../constants';
import {CircleButton} from '../../ui/Button';

const CATEGORIES = [
  {
    name: '디지털기기',
    id: 'DIGITAL',
    source: require('../../assets/categories/Digital.png'),
  },
  {
    name: '생활가전',
    id: 'HOMEAPPLIANCES',
    source: require('../../assets/categories/HomeAppliances.png'),
  },
  {
    name: '가구/인테리어',
    id: 'FURNITURE',
    source: require('../../assets/categories/Furniture.png'),
  },
  {
    name: '생활/주방',
    id: 'KITCHEN',
    source: require('../../assets/categories/Kitchen.png'),
  },
  {
    name: '유아동',
    id: 'FEEDINGBOTTLE',
    source: require('../../assets/categories/FeedingBottle.png'),
  },
  {
    name: '유아도서',
    id: 'CHILDRENBOOK',
    source: require('../../assets/categories/ChildrenBook.png'),
  },
  {
    name: '여성의류',
    id: 'FEMALECLOTHES',
    source: require('../../assets/categories/FemaleClothes.png'),
  },
  {
    name: '여성잡화',
    id: 'FEMALEBAG',
    source: require('../../assets/categories/FemaleBag.png'),
  },
  {
    name: '남성패션/잡화',
    id: 'MALECLOTHES',
    source: require('../../assets/categories/MaleClothes.png'),
  },
  {
    name: '뷰티/미용',
    id: 'BEAUTY',
    source: require('../../assets/categories/Beauty.png'),
  },
];

const DetailHeader = ({navigation}) => (
  <View
    style={{
      width: '100%',
      height: 60,
    }}>
    <CircleButton
      imgUrl={assets.left}
      handlePress={() => {
        navigation.goBack();
      }}
      left={16}
      top={StatusBar.currentHeight - 12}
    />
  </View>
);

const Category = () => {
  const navigation = useNavigation();

  const renderCategory = ({item}) => (
    <Pressable
      style={styles.categoryItem}
      onPress={() => console.log(item.name)}>
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
      <DetailHeader navigation={navigation} />
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
  },
});

export default Category;
