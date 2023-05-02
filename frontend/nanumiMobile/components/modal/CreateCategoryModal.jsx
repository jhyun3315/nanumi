import React from 'react';
import {
  FlatList,
  StyleSheet,
  Pressable,
  Image,
  Text,
  Modal,
} from 'react-native';
import {COLORS, SIZES, FONTS} from '../../constants';
import {CloseHeader} from '../../ui/BackHeader';
import {CATEGORIES} from '../../constants/category';
import {useModal} from '../../hooks/useModal';

const RenderCategory = ({item}) => {
  console.log(item);
  return (
    <Pressable style={styles.categoryItem} onPress={() => {}}>
      <Image style={styles.categoryImage} source={item.source} />
      <Text style={styles.categoryName}>{item.name}</Text>
    </Pressable>
  );
};

const CreateCategoryModal = ({}) => {
  const {hideModal} = useModal();
  return (
    <Modal
      style={styles.categoryContainer}
      visible={true}
      animationType="slide">
      <CloseHeader handlePress={hideModal} />
      <FlatList
        data={CATEGORIES}
        renderItem={({item}) => <RenderCategory item={item} />}
        keyExtractor={item => item.key.toString()}
      />
    </Modal>
  );
};

export default CreateCategoryModal;

const styles = StyleSheet.create({
  categoryContainer: {
    width: '100%',
    backgroundColor: COLORS.white,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
    paddingHorizontal: SIZES.extraLarge,
  },
  categoryImage: {
    width: SIZES.extraLarge,
    height: SIZES.extraLarge,
    marginBottom: SIZES.base,
    marginRight: SIZES.base,
  },
  categoryName: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.font,
    color: COLORS.primary,
  },
});
