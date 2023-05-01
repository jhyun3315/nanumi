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
import {CATEGORIES} from '../../constants/theme';
import {useInfiniteQuery} from '@tanstack/react-query';
import {requestGetCategoryProduct} from '../../api/product';
import {userState} from '../../state/user';

const Category = () => {
  const navigation = useNavigation();
  const [user] = useRecoilState(userState);
  const [productList, setProductList] = useRecoilState(productState);

  const handleCategoryClick = async categoryKey => {
    const response = await requestGetCategoryProduct(
      categoryKey,
      user.userId,
      categoryKey,
    );
    console.log(response.result.content);
    setProductList(response.result.content);
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
      <BackHeader navigation={navigation}>카테고리</BackHeader>
      <View style={styles.categoryContainer}>
        <FlatList
          data={CATEGORIES}
          keyExtractor={item => `${item.id}`}
          numColumns={3}
          columnWrapperStyle={{justifyContent: 'flex-start'}}
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
