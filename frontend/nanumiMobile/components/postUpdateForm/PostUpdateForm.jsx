import React, {useState, useCallback} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import {AddImageButton, ImageContainer} from './Image';
import {ProductCategory, ProductDesc, ProductTitle} from './ProductInfo';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CreateHeader} from '../../ui/BackHeader';
import {openPicker} from '@baronha/react-native-multiple-image-picker';
import {generateUniqueKey} from '../../util/uniqueId';
import {useQuery} from '@tanstack/react-query';
import {requestGetDetailProduct, requestUpdateProduct} from '../../api/product';
import {Fallback} from '../../ui/Fallback';
import {showErrorAlert} from '../../ui/Alert';
import {useModal} from '../../hooks/useModal';
import DataErrorModal from '../modal/DataErrorModal';
import ErrorModal from '../modal/ErrorModal';

const PostUpdateForm = ({navigation, productId}) => {
  const {data, isLoading, error} = useQuery(['product', productId], () =>
    requestGetDetailProduct(productId),
  );

  const {hideModal} = useModal();
  const [selectedCategory, setSelectedCategory] = useState({
    categoryId: data?.result?.categoryId,
    categoryName: data?.result?.categoryName,
  });

  const [images, setImages] = useState(
    data?.result?.productImageUrls.map(imageUrl => ({
      id: generateUniqueKey(),
      uri: imageUrl,
    })),
  );

  const [title, setTitle] = useState(data?.result?.name);
  const [description, setDescription] = useState(data?.result?.content);
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
    } catch (e) {}
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

  const handleCloseAndBack = () => {
    hideModal();
    navigation.goBack();
  };
  const renderItem = ({item}) => (
    <ImageContainer data={item} handlePress={handleImageDelete} />
  );

  const handleUpdateProduct = async () => {
    const formData = new FormData();

    images.forEach(image => {
      if (image.uri.startsWith('/storage')) {
        formData.append('images', {
          uri: `file://${image.uri}`,
          type: `image/${image.type}`,
          name: image.name,
        });
      } else {
        formData.append('images', {
          uri: image.uri,
          type: 'image/jpeg',
          name: generateUniqueKey(),
        });
      }
    });

    formData.append('name', title);
    formData.append('content', description);
    formData.append('categoryId', selectedCategory.categoryId);

    try {
      const response = await requestUpdateProduct(productId, formData);
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

  if (data?.code === 404)
    return <DataErrorModal handlePress={handleCloseAndBack} />;
  if (isLoading) return <Fallback />;
  if (error) return <ErrorModal />;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <CreateHeader
        navigation={navigation}
        handlePress={handleUpdateProduct}
        isDisable={isDisable}>
        수정
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

export default PostUpdateForm;

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
