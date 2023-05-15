import React from 'react';
import PostUpdateForm from '../components/postUpdateForm/PostUpdateForm';

const PostUpdateFormScreen = ({navigation, route}) => {
  const {productId} = route.params;
  return <PostUpdateForm navigation={navigation} productId={productId} />;
};

export default PostUpdateFormScreen;
