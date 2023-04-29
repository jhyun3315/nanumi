import React from 'react';
import {
  SafeAreaView,
  Text,
  FlatList,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import {BackHeader} from '../../ui/BackHeader';
import {COLORS, FONTS, SIZES, assets} from '../../constants';
import Icon from 'react-native-ionicons';

const reviews = [
  {
    id: '1',
    content: '미쳤따!',
    stars: 5,
    profileImage: assets.person01,
  },
  {
    id: '2',
    content: '좋은 물건 주셔서 감사합니다.! 감사히 잘 쓰겠습니다.',
    stars: 3,
    profileImage: assets.person02,
  },
  {
    id: '3',
    content: '감사합니다',
    stars: 1,
    profileImage: assets.person03,
  },
];

const renderReview = ({item}) => (
  <View style={styles.reviewContainer}>
    <View style={styles.profileContainer}>
      <Image source={item.profileImage} style={styles.profileImage} />
    </View>
    <View style={styles.reviewContent}>
      <Text style={styles.reviewText}>{item.content}</Text>
      <View style={styles.starContainer}>
        {[...Array(item.stars)].map((_, i) => (
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

const Review = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <BackHeader navigation={navigation}>리뷰목록</BackHeader>
      <FlatList
        data={reviews}
        renderItem={renderReview}
        keyExtractor={item => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
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
    width: SIZES.extraLarge * 1.6,
    height: SIZES.extraLarge * 1.6,
    borderRadius: SIZES.extraLarge,
    overflow: 'hidden',
    marginRight: SIZES.large,
  },
  profileImage: {
    width: '100%',
    height: '100%',
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
  starContainer: {
    flexDirection: 'row',
  },
});

export default Review;
