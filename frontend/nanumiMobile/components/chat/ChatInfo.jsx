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

export const ChatProductInfo = () => {
  return (
    <View style={styles.productContainer}>
      <Pressable>
        <Image
          source={{
            uri: 'https://dnvefa72aowie.cloudfront.net/origin/article/202304/a57a1ca73e29c26b6b680e9874ba24c8f8c0d7c17fb26087e8489efd40107d0b.jpg?q=95&s=1440x1440&t=inside',
          }}
          style={styles.productImage}
        />
      </Pressable>
      <View style={styles.infoContainer}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.productName}>
          상품명
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.productDescription}>
          상품 설명asdasdadasdskldjaskldasjasjasdjjkladkljakldjaskldjakldjak
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
        right: {
          backgroundColor: COLORS.disable,
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
        <Icon name="send" color={COLORS.gray} size={SIZES.extraLarge} />
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
