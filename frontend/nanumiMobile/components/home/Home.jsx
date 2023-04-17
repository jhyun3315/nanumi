import React from 'react';

import {SafeAreaView, StyleSheet} from 'react-native';
import {COLORS, Data} from '../../constants';
import {CategoryButton} from '../../ui/Button';
import {useNavigation} from '@react-navigation/native';
import FocusedStatusBar from '../../ui/FocusedStatusBar';
import ProductList from '../product/ProductList';

const Home = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <FocusedStatusBar background={COLORS.secondary} />
      <ProductList isSearch={false} data={Data} />
      <CategoryButton
        minwidth={40}
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
