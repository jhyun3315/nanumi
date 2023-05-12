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
import {requestCreateProduct} from '../../api/product';
import {useRecoilState} from 'recoil';
import {userState} from '../../state/user';
import {showErrorAlert} from './../../ui/Alert';

const PostCreateForm = () => {
  const navigation = useNavigation();
  const [user] = useRecoilState(userState);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const isDisable =
    !title || !selectedCategory || !description || !images.length > 0;

  const handleCategorySelected = useCallback((categoryId, categoryName) => {
    setSelectedCategory({categoryId, categoryName});
  }, []);

  const handleImageSelection = async () => {
    try {
      const response = await openPicker({
        mediaType: 'image',
        doneTitle: '완료',
        selectedAssets: [],
        isExportThumbnail: true,
        maxSelectedAssets: 10 - images.length,
        isPreview: false,
        usedCameraButton: false,
      });

      const paths = response.map(image => {
        const nameParts = image.fileName.split('.');
        const format = nameParts[nameParts.length - 1];
        return {
          id: generateUniqueKey(),
          uri: image.realPath,
          name: image.fileName,
          type: format,
        };
      });
      setImages([...images, ...paths]);
    } catch (e) {
      console.error(e);
    }
  };

  const handleImageDelete = id => {
    const newImages = images.filter(image => image.id !== id);
    setImages(newImages);
  };

  const handleTitle = text => {
    setTitle(prev => text);
  };

  const handleDescription = text => {
    setDescription(prev => text);
  };

  const handleCreateProduct = async () => {
    const formData = new FormData();

    images.forEach(image => {
      formData.append('images', {
        uri: `file://${image.uri}`,
        type: `image/${image.type}`,
        name: image.name,
      });
    });

    formData.append('name', title);
    formData.append('content', description);
    formData.append('categoryId', selectedCategory.categoryId);

    try {
      const response = await requestCreateProduct(user.userId, formData);
      if (response.code === 200) {
        navigation.navigate('BottomTabs', {screen: 'Home'});
      } else if (response.code === 413) {
        showErrorAlert('파일의 크기가 너무 큽니다.', navigation);
      } else {
        showErrorAlert('알 수 없는 에러 발생', navigation);
      }
    } catch (error) {
      showErrorAlert('알 수 없는 에러 발생', navigation);
    }
  };
  console.log('is', isDisable);
  const renderItem = ({item}) => (
    <ImageContainer data={item} handlePress={handleImageDelete} />
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <CreateHeader
        navigation={navigation}
        handlePress={handleCreateProduct}
        isDisable={isDisable}>
        등록
      </CreateHeader>
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
                images={images ? images : []}
              />
            }
          />
        </View>
        <ProductTitle title={title} handleTitle={handleTitle} />
        <ProductCategory
          selectedCategory={selectedCategory}
          handleCategorySelected={handleCategorySelected}
        />
        <ProductDesc
          description={description}
          handleDescription={handleDescription}
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
    marginBottom: SIZES.large,
  },
});
