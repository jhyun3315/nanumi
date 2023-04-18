import React from 'react';
import Icon from 'react-native-ionicons';
import {View, Pressable, Image, Text, StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constants';
export const ImageContainer = ({data}) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.deleteContainer}
        onPress={() => {
          console.log('on Press');
        }}>
        <Icon name="close" color={COLORS.primary} size={20} />
      </Pressable>
      <Image style={styles.imageBox} source={{uri: data}} />
    </View>
  );
};

export const AddImageButton = () => {
  return (
    <Pressable style={styles.addButton}>
      <Icon name="camera" color={COLORS.primary} />
      <Text style={{color: COLORS.primary}}>0/10</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 6,
  },
  deleteContainer: {
    position: 'absolute',
    top: 0,
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
    borderRadius: SIZES.font,
    width: 64,
    height: 64,
    borderWidth: 1,
    borderColor: COLORS.gray,
    marginRight: SIZES.small,
  },
});
