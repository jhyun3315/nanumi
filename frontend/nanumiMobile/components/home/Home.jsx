import React, {useEffect, useState} from 'react';

import {SafeAreaView, StyleSheet} from 'react-native';
import {COLORS} from '../../constants';
import {CategoryButton} from '../../ui/Button';
import {useNavigation} from '@react-navigation/native';
import FocusedStatusBar from '../../ui/FocusedStatusBar';
import ProductList from '../product/ProductList';

const Home = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <FocusedStatusBar background={COLORS.secondary} />
      <ProductList isSearch={false} />
      <CategoryButton
        minwidth={48}
        handlePress={() => navigation.navigate('Category')}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
