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
import {API_END_POINT} from '../../api/constant';
import axios from 'axios';

const PostCreateForm = () => {
  const navigation = useNavigation();
  const [user] = useRecoilState(userState);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCategorySelected = useCallback((categoryId, categoryName) => {
    setSelectedCategory({categoryId, categoryName});
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
          type: format,
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

    console.log(formData);
    try {
      const response = await axios.post(
        `${API_END_POINT}/products/${user.userId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log('response', response);
      return response;
    } catch (error) {
      console.log('error', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        console.log('error.data', error.response.data);
        console.log('error.stauts', error.response.status);
        console.log('error.header', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('error.request', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log('erro.config', error.config);
    }
  };
  const renderItem = ({item}) => (
    <ImageContainer data={item} handlePress={handleImageDelete} />
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <CreateHeader navigation={navigation} handlePress={handleCreateProduct}>
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
