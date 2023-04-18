import React, {useState, useCallback} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {COLORS} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {AddImageButton, ImageContainer} from './Image';
import {ProductCategory, ProductDesc, ProductTitle} from './ProductInfo';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CreateHeader} from '../../ui/CreateHeader';
import {openPicker} from '@baronha/react-native-multiple-image-picker';

const PostCreateForm = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [images, setImages] = useState([]);

  const handleCategorySelected = useCallback(category => {
    setSelectedCategory(category);
    setModalVisible(false);
  }, []);

  const handleImageSelection = async () => {
    try {
      const response = await openPicker({
        usedCameraButton: false,
        maxVideo: 1,
        selectedAssets: images,
        isExportThumbnail: true,
        isCrop: true,
        isCropCircle: true,
      });
      console.log('response', response);
    } catch (e) {
      console.log(e);
    }
  };

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
          <AddImageButton handlePress={handleImageSelection} />
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
        <ProductDesc />
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
