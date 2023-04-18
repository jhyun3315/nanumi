import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Text,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {COLORS, FONTS, SIZES, assets} from '../../constants';
import {CircleButton} from '../../ui/Button';
import {useNavigation} from '@react-navigation/native';

const DetailHeader = ({navigation}) => (
  <View
    style={{
      width: '100%',
      height: 60,
    }}>
    <CircleButton
      imgUrl={assets.left}
      handlePress={() => {
        navigation.goBack();
      }}
      left={16}
      top={StatusBar.currentHeight - 12}
    />
  </View>
);

export const ProductTitle = () => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="상품명"
        placeholderTextColor={COLORS.gray}
        style={[styles.textInput, styles.title]}
      />
    </View>
  );
};

export const ProductCategory = ({navigation}) => {
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        navigation.navigate('CreateCategory');
      }}>
      <TextInput
        placeholder="카테고리"
        placeholderTextColor={COLORS.gray}
        style={[styles.textInput, styles.category]}
        editable={false}
      />
    </Pressable>
  );
};

export const CategoryList = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <DetailHeader navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1,
    margin: 0,
    marginBottom: SIZES.base,
  },
  textInput: {},
  title: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    lineHeight: 32,
  },

  category: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    lineHeight: 24,
  },
});
