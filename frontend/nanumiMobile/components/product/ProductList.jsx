import React, {useEffect, useState} from 'react';
import ProductCard from './ProductCard';
import Header from '../../ui/Header';
import ErrorModal from '../modal/ErrorModal';
import EmptyState from '../../ui/EmptyState';
import {COLORS} from '../../constants';
import {View, FlatList, StyleSheet} from 'react-native';
import {useInfiniteQuery} from '@tanstack/react-query';
import {requestGetAllProduct} from './../../api/product';
import {Fallback} from '../../ui/Fallback';
import {useRecoilState} from 'recoil';
import {userState} from '../../state/user';
import {productState} from '../../state/product';

const ProductList = ({isSearch}) => {
  const [user] = useRecoilState(userState);
  const [productList, setProductList] = useState(productState);
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['products'],
    ({pageParam = 0}) => requestGetAllProduct(pageParam, user.userId),
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

  useEffect(() => {
    setProductList(prev => ({
      ...prev,
      isFetchingNextPage: isFetchingNextPage,
    }));
  }, [isFetchingNextPage]);

  useEffect(() => {
    setProductList(prev => ({
      ...prev,
      data: data,
      error: error,
      isLoading: isLoading,
      hasNextPage: hasNextPage,
    }));
  }, [data, error, isLoading, hasNextPage]);

  const content = data?.pages.flatMap(page => page.result.content) ?? [];

  if (error) return <ErrorModal handlePress={fetchNextPage} />;
  if (isLoading) return <Fallback />;
  if (!data?.pages[0]?.result.content) return <EmptyState />;

  return (
    <View style={styles.container}>
      <View style={styles.flatListWrapper}>
        <FlatList
          data={content}
          renderItem={({item}) => <ProductCard data={item} />}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={isSearch ? '' : <Header />}
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

export default ProductList;
