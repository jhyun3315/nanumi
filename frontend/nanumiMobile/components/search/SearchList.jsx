import React, {useState, useEffect} from 'react';
import {COLORS} from '../../constants';
import {View, FlatList, StyleSheet} from 'react-native';
import {useInfiniteQuery} from '@tanstack/react-query';
import {requestSearchProduct} from './../../api/product';
import {Fallback} from '../../ui/Fallback';
import {userState} from '../../state/user';
import {useRecoilState} from 'recoil';
import ProductCard from '../product/ProductCard';
import ErrorModal from '../modal/ErrorModal';
import EmptyState from '../../ui/EmptyState';

const SearchList = ({words}) => {
  const [user] = useRecoilState(userState);
  const [productList, setProductList] = useState([]);

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['search', words],
    ({pageParam = 0}) => requestSearchProduct(words, user.userId, pageParam),
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
    setProductList({
      ...productList,
      isFetchingNextPage: isFetchingNextPage,
    });
  }, [isFetchingNextPage]);

  useEffect(() => {
    setProductList({
      ...productList,
      data: data,
      error: error,
      isLoading: isLoading,
      hasNextPage: hasNextPage,
    });
  }, [data, error, isLoading, hasNextPage]);

  const content =
    productList?.data?.pages?.flatMap(page => page?.result?.content) ?? [];

  if (error) return <ErrorModal handlePress={fetchNextPage} />;
  if (isLoading) return <Fallback />;

  return (
    <View style={styles.container}>
      <View style={styles.flatListWrapper}>
        <FlatList
          data={content}
          renderItem={({item}) => <ProductCard data={item} />}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
        />
      </View>
      {productList?.data?.pages[0]?.result?.content.length === 0 && (
        <EmptyState />
      )}
      <View style={styles.backgroundWrapper}>
        <View style={styles.backgroundTop} />
        <View style={styles.backgroundBottom} />
      </View>
    </View>
  );
};

export default SearchList;

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
