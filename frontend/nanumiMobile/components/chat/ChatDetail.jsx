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
import {useModal} from '../../hooks/useModal';
import BlockModal from '../modal/BlockModal';
import ChatExitModal from '../modal/ChatExitModal';

const ChatDetail = ({navigation}) => {
  const {modal, showModal} = useModal();

  const handleCloseBottomModal = () => {
    bottomSheetModalRef.current?.close();
  };

  const handleOpenBlockModal = () => {
    handleCloseBottomModal();
    setTimeout(() => {
      showModal({
        modalType: 'BlockModal',
      });
    }, 300);
  };

  const handleOpenChatExitModal = () => {
    handleCloseBottomModal();
    setTimeout(() => {
      showModal({
        modalType: 'ChatExitModal',
      });
    }, 300);
  };
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['33%'], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

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
        {modal?.modalType === 'BlockModal' && <BlockModal />}
        {modal?.modalType === 'ChatExitModal' && <ChatExitModal />}
        <BottomSheetModal
          isBackDropDismisByPress={true}
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backdropComponent={renderBackDrop}
          animationConfigs={{
            duration: 200,
          }}>
          <ChatOptions
            navigation={navigation}
            handleCloseBottomModal={handleCloseBottomModal}
            handleOpenBlockModal={handleOpenBlockModal}
            handleOpenChatExitModal={handleOpenChatExitModal}
          />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default ChatDetail;
