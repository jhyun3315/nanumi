import React from 'react';
import Review from '../components/review/Review';

const ReviewScreen = ({navigation, route}) => {
  const {userId} = route.params;
  return <Review navigation={navigation} userId={userId} />;
};

export default ReviewScreen;
