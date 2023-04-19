import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
} from 'react-native';
import {MoreHeader} from '../../ui/BackHeader';
import {SIZES, COLORS, FONTS} from '../../constants';
import {MESSAGES} from '../../constants/dummy';
import Icon from 'react-native-ionicons';

export const ChatHeader = ({navigation}) => {
  return (
    <>
      <MoreHeader navigation={navigation} />
    </>
  );
};

export const ChatInput = () => {
  const [message, setMessage] = useState('');
  return (
    <View style={styles.inputContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.inputAndMicroPhone}>
          <TextInput
            multiline
            placeholder="메시지를 입력해주세요..."
            style={styles.input}
            onChangeText={text => {
              setMessage(text);
            }}
          />
          <Pressable style={styles.rightIconButtonStyle}>
            <Icon name="flame" color={COLORS.gray} size={SIZES.extraLarge} />
          </Pressable>
          <Pressable style={styles.rightIconButtonStyle}>
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
});
