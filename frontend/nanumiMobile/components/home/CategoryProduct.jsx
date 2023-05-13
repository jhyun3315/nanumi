import React from 'react';
import {useInfiniteQuery} from '@tanstack/react-query';
import {View, FlatList, StyleSheet} from 'react-native';
import {requestGetCategoryProduct} from '../../api/product';
import {useRecoilState} from 'recoil';
import {userState} from '../../state/user';
import {COLORS} from '../../constants';
import {Fallback} from '../../ui/Fallback';
import {BackHeader} from './../../ui/BackHeader';
import {useNavigation} from '@react-navigation/native';
import ProductCard from './../product/ProductCard';
import EmptyState from '../../ui/EmptyState';
import ErrorModal from '../modal/ErrorModal';

const CategoryProduct = ({categoryKey, categoryName}) => {
  const [user] = useRecoilState(userState);
  const navigation = useNavigation();

  const {data, error, isLoading, fetchNextPage, hasNextPage, refetch} =
    useInfiniteQuery(
      ['category'],
      ({pageParam = 0}) =>
        requestGetCategoryProduct(categoryKey, user.userId, pageParam),
      {
        getNextPageParam: (lastPage, pages) => {
          if (
            !lastPage?.result?.content?.length ||
            (pages &&
              pages.length > 0 &&
              pages[pages.length - 1].result &&
              pages[pages.length - 1].result.last)
          ) {
            return undefined;
          }
          return pages ? pages?.length : undefined;
        },
      },
    );

  const handleLoadMore = () => {
    if (!isLoading && hasNextPage) fetchNextPage();
  };

  const content = data?.pages.flatMap(page => page?.result?.content) ?? [];

  if (error) return <ErrorModal handlePress={refetch} />;
  if (isLoading) return <Fallback />;

  return (
    <View style={styles.container}>
      <BackHeader navigation={navigation}>{categoryName}</BackHeader>
      {data?.pages[0]?.result.content.length === 0 && <EmptyState />}

      <View style={styles.flatListWrapper}>
        <FlatList
          data={content}
          renderItem={({item}) => <ProductCard data={item} />}
          keyExtractor={item => item?.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
        />
      </View>
      <View style={styles.backgroundWrapper}>
        <View style={styles.backgroundTop} />
        <View style={styles.backgroundBottom} />
      </View>
    </View>
  );
};

export default CategoryProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListWrapper: {
    zIndex: 0,
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: 16,
  },
  backgroundWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: -1,
  },
  backgroundTop: {
    height: 200,
    backgroundColor: COLORS.white,
  },
  backgroundBottom: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
