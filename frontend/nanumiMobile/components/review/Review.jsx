import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  FlatList,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import {BackHeader} from '../../ui/BackHeader';
import {COLORS, FONTS, SIZES} from '../../constants';
import {requestGetReview} from '../../api/product';
import {Fallback} from '../../ui/Fallback';
import {useInfiniteQuery} from '@tanstack/react-query';
import Icon from 'react-native-ionicons';
import ErrorModal from '../modal/ErrorModal';

const renderReview = ({item}) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.profileContainer}>
        <Image
          source={{uri: item?.writerProfileUrl}}
          style={styles.profileImage}
        />
        <Text style={styles.profileText}>{item?.writerNickname}</Text>
      </View>
      <View style={styles.reviewContent}>
        <Text style={styles.reviewText}>{item?.content}</Text>
        <View style={styles.starContainer}>
          {[...Array(item?.starPoint)].map((_, i) => (
            <Icon
              key={i}
              name="star"
              size={SIZES.large}
              color={COLORS.yellow}
              style={{marginRight: SIZES.small / 2}}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const Review = ({navigation, userId}) => {
  const [review, setReview] = useState({});
  const {
    data,
    error,
    isError,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(
    ['review'],
    ({pageParam = 0}) => requestGetReview(userId, pageParam),
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
    setReview(prev => ({
      ...prev,
      isFetchingNextPage: isFetchingNextPage,
    }));
  }, [isFetchingNextPage]);

  useEffect(() => {
    setReview(prev => ({
      ...prev,
      data: data,
      error: error,
      isLoading: isLoading,
      hasNextPage: hasNextPage,
    }));
  }, [data, error, isLoading, hasNextPage]);

  const content =
    review?.data?.pages?.flatMap(page => page?.result?.content) ?? [];

  if (isError) return <ErrorModal handlePress={refetch} />;
  if (isLoading) return <Fallback />;

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader navigation={navigation}>리뷰목록</BackHeader>
      <FlatList
        data={content}
        renderItem={renderReview}
        keyExtractor={item => item?.id.toString()}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={2}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: SIZES.large,
  },
  reviewContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.small,
    marginBottom: SIZES.small,
    padding: SIZES.large,
  },
  profileContainer: {
    width: SIZES.extraLarge * 3,
    height: SIZES.extraLarge * 3,
    borderRadius: SIZES.extraLarge * 5,
    alignContent: 'center',
  },
  profileImage: {
    width: SIZES.extraLarge * 1.9,
    height: SIZES.extraLarge * 1.9,
    borderRadius: SIZES.extraLarge * 1.9,
    marginBottom: SIZES.base,
  },
  reviewContent: {
    flex: 1,
  },
  reviewText: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: SIZES.font,
    marginBottom: SIZES.base,
  },
  profileText: {
    color: COLORS.primary,
    fontFamily: FONTS.medium,
    fontSize: SIZES.small,
    marginBottom: SIZES.base,
  },
  starContainer: {
    flexDirection: 'row',
  },
});

export default Review;
