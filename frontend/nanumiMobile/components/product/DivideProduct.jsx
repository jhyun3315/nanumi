import React, {useState, useEffect, useMemo} from 'react';
import {COLORS} from '../../constants';
import {View, FlatList, StyleSheet} from 'react-native';
import {useRecoilState} from 'recoil';
import {BackHeader} from '../../ui/BackHeader';
import {useInfiniteQuery} from '@tanstack/react-query';
import {userState} from '../../state/user';
import {
  requsetGetDividingProduct,
  requestGetDividedProductList,
  requestGetReceivedProductList,
} from '../../api/product';
import {Fallback} from '../../ui/Fallback';
import ProductCard from './ProductCard';
import ErrorModal from '../modal/ErrorModal';
import EmptyState from '../../ui/EmptyState';

const DivideProduct = ({navigation, type, userId}) => {
  const queryFn = useMemo(() => {
    switch (type) {
      case 'divided':
        return requestGetDividedProductList;
      case 'dividing':
        return requsetGetDividingProduct;
      case 'received':
        return requestGetReceivedProductList;
    }
  }, [type]);

  const title = useMemo(() => {
    switch (type) {
      case 'divided':
        return '나눔한 상품';
      case 'dividing':
        return '나눔중인 상품';
      case 'received':
        return '나눔받은 상품';
    }
  }, [type]);

  const {data, error, isLoading, fetchNextPage, hasNextPage, refetch} =
    useInfiniteQuery([type], ({pageParam = 0}) => queryFn(userId, pageParam), {
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
    });

  const handleLoadMore = () => {
    if (!isLoading && hasNextPage) fetchNextPage();
  };

  const content = data?.pages?.flatMap(page => page?.result?.content) ?? [];

  if (error) return <ErrorModal handlePress={refetch} />;
  if (isLoading) return <Fallback />;

  return (
    <View style={styles.container}>
      <BackHeader navigation={navigation}>{title}</BackHeader>
      <View style={styles.flatListWrapper}>
        <FlatList
          data={content}
          renderItem={({item}) => <ProductCard data={item} />}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={2}
        />
      </View>
      {data?.pages[0]?.result?.content.length === 0 && <EmptyState />}
      <View style={styles.backgroundWrapper}>
        <View style={styles.backgroundTop} />
        <View style={styles.backgroundBottom} />
      </View>
    </View>
  );
};

export default DivideProduct;

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
