import React, {useState, useCallback} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {COLORS} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {AddImageButton, ImageContainer} from './Image';
import {ProductCategory, ProductTitle} from './ProductInfo';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CreateHeader} from '../../ui/CreateHeader';

const PostCreateForm = () => {
  console.log('렌더링 확인');
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [images, setImages] = useState([
    'https://dnvefa72aowie.cloudfront.net/origin/article/202304/f4dc3285f453c0907743cc05c3c474a03dad9c360e5740f6728d0c710857bcb4.webp?q=95&s=1440x1440&t=inside',
    'https://dnvefa72aowie.cloudfront.net/origin/article/202304/540cdd9013c26f46e1e196f31d91591670d5480e927930dd1d0f37089d05cc67.webp?q=95&s=1440x1440&t=inside',
  ]);

  const handleCategorySelected = useCallback(category => {
    setSelectedCategory(category);
    setModalVisible(false);
  }, []);

  const renderItem = useCallback(
    ({item}) => <ImageContainer data={item} />,
    [],
  );

  const keyExtractor = useCallback((_, index) => `image-${index}`, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <CreateHeader navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <AddImageButton />
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={images}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
          />
        </View>
        <ProductTitle />
        <ProductCategory
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          selectedCategory={selectedCategory}
          handleCategorySelected={handleCategorySelected}
        />
      </View>
    </SafeAreaView>
  );
};

export default PostCreateForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
