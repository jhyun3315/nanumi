import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Text,
  Image,
} from 'react-native';
import {MoreHeader} from '../../ui/BackHeader';
import {Bubble, Send} from 'react-native-gifted-chat';
import {COLORS, SIZES, FONTS} from '../../constants';
import Icon from 'react-native-ionicons';

export const ChatHeader = ({navigation, handlePresentModalPress}) => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
      <MoreHeader
        navigation={navigation}
        handlePresentModalPress={handlePresentModalPress}
      />
    </View>
  );
};

export const ChatProductInfo = ({data}) => {
  return (
    <View style={styles.productContainer}>
      <Pressable>
        <Image
          source={{uri: data?.productImageUrls[0]}}
          style={styles.productImage}
        />
      </Pressable>
      <View style={styles.infoContainer}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.productName}>
          {data?.name}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.productDescription}>
          {data?.content}
        </Text>
      </View>
    </View>
  );
};

export const renderBubble = props => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: COLORS.lightGray,
        },
        right: {
          backgroundColor: COLORS.lightViolet,
        },
      }}
      textStyle={{
        right: {
          color: COLORS.white,
        },
      }}
    />
  );
};

export const renderSend = props => {
  return (
    <Send {...props}>
      <View style={styles.sendingContainer}>
        <Icon name="send" color={COLORS.primary} size={SIZES.extraLarge} />
      </View>
    </Send>
  );
};

export const renderLoading = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={COLORS.violet} />
    </View>
  );
};

const styles = StyleSheet.create({
  sendingContainer: {
    width: '100%',
    height: '100%',
    marginRight: SIZES.base * 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    borderTopColor: COLORS.lightGray,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: SIZES.base,
    marginLeft: SIZES.base,
  },
  infoContainer: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  productName: {
    fontFamily: FONTS.medium,
    width: '80%',
    color: COLORS.primary,
    fontSize: SIZES.font,
  },
  productDescription: {
    color: COLORS.primary,
    fontFamily: FONTS.light,
    width: '80%',
    fontSize: SIZES.font - 3,
  },
});
