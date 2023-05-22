import React from 'react';
import {COLORS, SIZES} from '../../constants/theme';
import {CATEGORIES} from '../../constants/category';

import {
  View,
  Pressable,
  Image,
  Text,
  FlatList,
  StyleSheet,
  Modal,
} from 'react-native';
import {CloseHeader} from '../../ui/BackHeader';
import {useModal} from '../../hooks/useModal';
import {useNavigation} from '@react-navigation/native';

const HomeCategoryModal = () => {
  const navigation = useNavigation();
  const {modal, hideModal} = useModal();

  const closeModalAndNavigate = (categoryKey, categoryName) => {
    hideModal();
    navigation.navigate('CategoryProduct', {
      categoryKey: categoryKey,
      categoryName: categoryName,
    });
  };

  const renderCategory = ({item}) => {
    return (
      <Pressable
        style={styles.categoryItem}
        onPress={() => closeModalAndNavigate(item.key, item.name)}>
        <Image
          style={styles.categoryImage}
          source={item.source}
          resizeMode="contain"
        />
        <Text style={styles.categoryName}>{item.name}</Text>
      </Pressable>
    );
  };

  return (
    <Modal
      style={styles.container}
      animationType="fade"
      visible={modal?.modalProps?.visible}>
      <CloseHeader handlePress={hideModal}>카테고리</CloseHeader>
      <View style={styles.categoryContainer}>
        <FlatList
          data={CATEGORIES}
          keyExtractor={item => `${item.id}`}
          numColumns={3}
          columnWrapperStyle={{justifyContent: 'flex-start'}}
          renderItem={renderCategory}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Modal>
  );
};

export default HomeCategoryModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  categoryContainer: {
    paddingHorizontal: SIZES.padding,
    flex: 1,
  },
  categoryItem: {
    flex: 1 / 3,
    alignItems: 'center',
    marginBottom: SIZES.base * 2,
    marginTop: SIZES.base * 2,
  },
  categoryImage: {
    width: 24,
    height: 24,
  },
  categoryName: {
    marginTop: SIZES.base,
    color: COLORS.primary,
  },
});
