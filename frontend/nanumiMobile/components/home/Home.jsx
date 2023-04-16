import React from 'react';

import {SafeAreaView, StyleSheet, View, FlatList, Text} from 'react-native';
import {COLORS, Data} from '../../constants';
import FocusedStatusBar from '../../ui/FocusedStatusBar';
import Header from '../../ui/Header';
import ProductCard from '../product/ProductCard';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FocusedStatusBar background={COLORS.secondary} />
      <View style={{flex: 1}}>
        <View style={{zIndex: 0}}>
          <FlatList
            data={Data}
            renderItem={({item}) => <ProductCard data={item} />}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<Header />}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: -1,
          }}>
          <View style={{height: 200, backgroundColor: COLORS.white}} />
          <View style={{flex: 1, backgroundColor: COLORS.white}} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
