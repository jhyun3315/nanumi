import React from 'react';
import Icon from 'react-native-ionicons';
import {View, Pressable, Image, Text, StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constants';
export const ImageContainer = ({data, handlePress}) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.deleteContainer}
        onPress={() => {
          handlePress(data.id);
        }}>
        <Icon name="close" color={COLORS.primary} size={20} />
      </Pressable>
      <Image style={styles.imageBox} source={{uri: `file:///${data.uri}`}} />
    </View>
  );
};

export const AddImageButton = ({images, handlePress}) => {
  return (
    <Pressable style={styles.addButton} onPress={handlePress}>
      <Icon name="camera" color={COLORS.primary} />
      <Text style={{color: COLORS.primary}}>{images.length}/10</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 6,
  },
  deleteContainer: {
    position: 'absolute',
    top: -5,
    right: 0,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.white,
  },
  imageBox: {
    width: 64,
    height: 64,
    marginRight: SIZES.base,
    borderRadius: SIZES.base / 2,
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.base / 2,
    width: 64,
    height: 64,
    borderWidth: 1,
    borderColor: COLORS.gray,
    marginRight: SIZES.small,
  },
});
