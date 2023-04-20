import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import {MoreHeader} from '../../ui/BackHeader';
import {SIZES, COLORS, FONTS, assets} from '../../constants';
import {MESSAGES} from '../../constants/dummy';
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

export const ChatInput = () => {
  const [message, setMessage] = useState('');

  const handleMessage = () => {
    setMessage('');
  };
  return (
    <View style={styles.inputContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.inputAndMicroPhone}>
          <TextInput
            multiline
            placeholder="메시지를 입력해주세요..."
            style={styles.input}
            value={message}
            onChangeText={text => {
              setMessage(text);
            }}
          />

          <Pressable
            style={styles.rightIconButtonStyle}
            onPress={message ? handleMessage : ''}>
            <Icon
              name={message ? 'send' : 'camera'}
              color={COLORS.gray}
              size={SIZES.large}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export const Message = ({time, isLeft, message}) => {
  const isOnLeft = type => {
    if (isLeft && type === 'messageContainer') {
      return {
        alignSelf: 'flex-start',
        backgroundColor: COLORS.lightGray,
        borderTopLeftRadius: 0,
      };
    } else if (isLeft & (type === 'message')) return {color: COLORS.primary};
    else if (isLeft && type === 'time') return {color: 'darkgray'};
    else return {borderTopRightRadius: 0};
  };
  return (
    <View style={styles.messageOuterContainer}>
      <View
        style={[styles.messageInnerContainer, isOnLeft('messageContainer')]}>
        <View style={styles.messageView}>
          <Text style={[styles.message, isOnLeft('message')]}>{message}</Text>
        </View>
        <View style={styles.timeView}>
          <Text style={[styles.time, isOnLeft('time')]}>{time}</Text>
        </View>
      </View>
    </View>
  );
};

export const MessagesList = () => {
  const [messages, setMessages] = useState(MESSAGES);
  const user = useRef(0);
  const scrollView = useRef();
  return (
    <ScrollView
      ref={ref => (scrollView.current = ref)}
      onContentChange={() => {
        scrollView.current.scrollToEnd({animated: true});
      }}>
      <ChatProductInfo />
      {messages.map((message, index) => (
        <Message
          key={index}
          time={message.time}
          isLeft={message.user !== user.current}
          message={message.content}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
    bottom: 0,
    zIndex: 1,
  },
  innerContainer: {
    width: '100%',
    paddingHorizontal: SIZES.base,
    marginHorizontal: SIZES.base,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.base,
  },
  inputAndMicroPhone: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightGray,
    flex: 3,
    borderRadius: SIZES.extraLarge,
    marginRight: SIZES.base,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: 'transparent',
    paddingLeft: SIZES.large,
    flex: 3,
    color: COLORS.primary,
    alignSelf: 'center',
    height: 50,
    maxHeight: 100,
  },
  rightIconButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: SIZES.medium,
  },
  emotionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: SIZES.medium,
  },
  sendButton: {
    backgroundColor: COLORS.violet,
    borderRadius: SIZES.extraLarge,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageOuterContainer: {
    paddingVertical: SIZES.base,
    marginVertical: SIZES.small,
  },
  messageInnerContainer: {
    backgroundColor: COLORS.lightViolet,
    maxWidth: '80%',
    alignSelf: 'flex-end',
    borderRadius: SIZES.medium,
    paddingHorizontal: SIZES.base,
    marginHorizontal: SIZES.base,
    paddingTop: SIZES.small,
  },
  messageView: {
    backgroundColor: 'transparent',
    maxWidth: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeView: {
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    padding: SIZES.small / 2,
  },
  message: {
    color: COLORS.white,
    fontFamily: FONTS.medium,
    fontSize: SIZES.font,
    alignSelf: 'flex-start',
  },
  time: {
    color: COLORS.lightGray,
    alignSelf: 'flex-end',
    fontFamily: FONTS.light,
    fontSize: SIZES.base * 1.2,
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
