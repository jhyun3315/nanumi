import React, {useState} from 'react';
import {View, StyleSheet, FlatList, StatusBar, TextInput} from 'react-native';
import {SIZES, assets} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {CircleButton, RectButton} from '../../ui/Button';
import {AddImageButton, ImageContainer} from './Image';
import {ProductCategory, ProductTitle} from './ProductInfo';
import {SafeAreaView} from 'react-native-safe-area-context';

const CreateHeader = ({navigation}) => (
  <View style={styles.header}>
    <CircleButton
      imgUrl={assets.left}
      handlePress={() => {
        navigation.goBack();
      }}
      left={16}
      top={StatusBar.currentHeight - 12}
    />
    <RectButton
      minWidth={64}
      handlePress={() => console.log('등록')}
      position={'absolute'}
      right={16}
      top={StatusBar.currentHeight - 12}>
      등록
    </RectButton>
  </View>
);

const PostCreateForm = () => {
  const navigation = useNavigation();
  const [images, setImages] = useState([
    'https://dnvefa72aowie.cloudfront.net/origin/article/202304/f4dc3285f453c0907743cc05c3c474a03dad9c360e5740f6728d0c710857bcb4.webp?q=95&s=1440x1440&t=inside',
    'https://dnvefa72aowie.cloudfront.net/origin/article/202304/540cdd9013c26f46e1e196f31d91591670d5480e927930dd1d0f37089d05cc67.webp?q=95&s=1440x1440&t=inside',
  ]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <CreateHeader navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <AddImageButton />
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={images}
            keyExtractor={(_, index) => `image-${index}`}
            renderItem={({item}) => <ImageContainer data={item} />}
          />
        </View>
        <ProductTitle />
        <ProductCategory navigation={navigation} />
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
  header: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    marginBottom: SIZES.base,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
