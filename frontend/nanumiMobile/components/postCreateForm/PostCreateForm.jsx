import React, {useState, useCallback} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {AddImageButton, ImageContainer} from './Image';
import {ProductCategory, ProductDesc, ProductTitle} from './ProductInfo';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CreateHeader} from '../../ui/BackHeader';
import {openPicker} from '@baronha/react-native-multiple-image-picker';
import {generateUniqueKey} from '../../util/uniqueId';

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
        mediaType: 'image',
        doneTitle: '완료',
        selectedAssets: [],
        isExportThumbnail: true,
        maxSelectedAssets: 10 - images.length,
        isCrop: true,
        isCropCircle: true,
        usedCameraButton: true,
      });
      const paths = response.map(image => {
        const nameParts = image.fileName.split('.');
        const format = nameParts[nameParts.length - 1];
        return {
          id: generateUniqueKey(),
          uri: image.realPath,
          name: image.fileName,
          format: format,
        };
      });
      setImages([...images, ...paths]);
    } catch (e) {
      console.log(e);
    }
  };

  const handleImageDelete = id => {
    const newImages = images.filter(image => image.id !== id);
    setImages(newImages);
  };

  const renderItem = ({item}) => (
    <ImageContainer data={item} handlePress={handleImageDelete} />
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <CreateHeader navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={images}
            keyExtractor={(_, index) => `image-${index}`}
            renderItem={renderItem}
            ListHeaderComponent={
              <AddImageButton
                handlePress={handleImageSelection}
                images={images}
              />
            }
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
    marginBottom: SIZES.large,
  },
});
