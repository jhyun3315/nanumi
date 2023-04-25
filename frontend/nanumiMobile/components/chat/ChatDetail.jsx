import React, {useState, useCallback, useRef, useMemo} from 'react';
import {SafeAreaView} from 'react-native';
import {
  ChatHeader,
  ChatProductInfo,
  renderBubble,
  renderLoading,
  renderSend,
} from './ChatInfo';
import {ChatOptions} from './ChatOptions';
import {COLORS} from '../../constants';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {GiftedChat} from 'react-native-gifted-chat';
import BlockModal from '../modal/BlockModal';

const ChatDetail = ({navigation}) => {
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['33%'], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const [visible, setVisible] = useState(false);

  const openModal = () => {
    bottomSheetModalRef.current?.close();
    setTimeout(() => {
      setVisible(true);
    }, 300);
  };

  const closeModal = () => {
    setVisible(false);
  };

  const [messages, setMessages] = useState([
    {
      _id: 0,
      text: 'New room created.',
      createdAt: new Date().getTime(),
      system: true,
    },
    {
      _id: 1,
      text: 'Henlo!',
      createdAt: new Date().getTime(),
      user: {
        _id: 2,
        name: 'Test User',
      },
    },
  ]);

  const handleSend = newMessage => {
    setMessages(GiftedChat.append(messages, newMessage));
  };
  // bottomModal이 움직일 떄 동작하는 함수 필요시 사용할듯

  // const handleSheetChanges = useCallback(index => {
  //   console.log('handleSheetChanges', index);
  // }, []);

  const renderBackDrop = useCallback(props => {
    return (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        enableTouchThrough={true}
        pressBehavior="close"
      />
    );
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BlockModal visible={visible} closeModal={closeModal} />
      <BottomSheetModalProvider>
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
          <ChatHeader
            navigation={navigation}
            handlePresentModalPress={handlePresentModalPress}
          />
          <ChatProductInfo />
          <GiftedChat
            messages={messages}
            onSend={newMessage => handleSend(newMessage)}
            placeholder="메시지를 입력해주세요..."
            user={{_id: 1}}
            renderBubble={renderBubble}
            renderSend={renderSend}
            scrollToBottom
            renderLoading={renderLoading}
          />
        </SafeAreaView>
        <BottomSheetModal
          isBackDropDismisByPress={true}
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backdropComponent={renderBackDrop}
          animationConfigs={{
            duration: 200,
          }}>
          <ChatOptions openModal={openModal} />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default ChatDetail;
