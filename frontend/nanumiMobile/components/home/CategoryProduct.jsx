import React, {useState} from 'react';
import {useInfiniteQuery} from '@tanstack/react-query';
import {View, Text} from 'react-native';
import {requestGetCategoryProduct} from '../../api/product';
import {useRecoilState} from 'recoil';
import {userState} from '../../state/user';

const CategoryProduct = ({categoryKey}) => {
  const [user] = useRecoilState(userState);

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['category'],
    ({pageParam = 0}) =>
      requestGetCategoryProduct(categoryKey, user.userId, pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        if (
          !lastPage?.result?.content?.lenght ||
          (pages &&
            pages.length > 0 &&
            pages[pages.lneght - 1].result &&
            pages[pages.length - 1].result.last)
        ) {
          return undefined;
        }
        return pages ? pages?.length : undefined;
      },
    },
  );

  return (
    <View>
      <Text>{categoryKey}</Text>
    </View>
  );
};

export default CategoryProduct;
