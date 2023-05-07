import React, {useState, useCallback, useRef, useMemo, useEffect} from 'react';
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
import {requestGetDetailProduct} from '../../api/product';
import {Fallback} from '../../ui/Fallback';
import {useQuery} from '@tanstack/react-query';
import GlobalModal from '../modal/GlobalModal';
import ErrorModal from '../modal/ErrorModal';
import DataErrorModal from '../modal/DataErrorModal';

const ChatDetail = ({navigation, productId}) => {
  const {showModal, hideModal} = useModal();
  const ws = useRef(null);
  const {data, isLoading, error, refetch} = useQuery(
    ['product', productId],
    () => requestGetDetailProduct(productId),
  );

  const handleCloseAndBack = () => {
    hideModal();
    navigation.goBack();
  };
  const handleCloseBottomModal = () => {
    bottomSheetModalRef.current?.close();
  };

  const handleOpenBlockUserModal = () => {
    handleCloseBottomModal();
    setTimeout(() => {
      showModal({
        modalType: 'TwoButtonModal',
        modalProps: {
          title: '차단하기',
          content:
            '차단시 상대방과의 거래가 취소되고 서로의 게시글을 확인하거나 채팅을 할 수 없어요. 차단하실래요?',
          visible: true,
          onConfirm: hideModal,
          onCancel: hideModal,
        },
      });
    }, 300);
  };

  const handleOpenChatExitModal = () => {
    handleCloseBottomModal();
    setTimeout(() => {
      showModal({
        modalType: 'TwoButtonModal',
        modalProps: {
          title: '채팅방 나가기',
          content:
            '채팅방을 나가면 채팅 목록 및 대화 내용이 삭제되고 복구할 수없어요. 채팅방에서 나가시겠어요?',
          visible: true,
          onConfirm: hideModal,
          onCancel: hideModal,
        },
      });
    }, 300);
  };

  const handleOpenTransactionCompleteModal = () => {
    handleCloseBottomModal();
    setTimeout(() => {
      showModal({
        modalType: 'TransactionCompleteModal',
      });
    }, 300);
  };

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['40%', '55%'], []);
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

  useEffect(() => {
    ws.current = new WebSocket(`http://localhost:8080/ws-stomp`);
    console.log(ws.current);
    ws.onopen = () => {
      console.log('connected');
    };

    ws.onmessage = e => {
      console.log('message', e.data);
    };

    ws.onerror = e => {
      console.log('error', e.message);
    };

    ws.onclose = e => {
      console.log('close', e.code, e.reason);

      return () => {
        ws.close();
      };
    };
  }, []);

  if (data?.code === 404)
    return <DataErrorModal handlePress={handleCloseAndBack} />;
  if (isLoading) return <Fallback />;
  if (error) return <ErrorModal handlePress={refetch} />;

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
          <ChatHeader
            navigation={navigation}
            handlePresentModalPress={handlePresentModalPress}
          />
          <ChatProductInfo data={data?.result} />
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
        <GlobalModal />
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
            handleOpenBlockUserModal={handleOpenBlockUserModal}
            handleOpenChatExitModal={handleOpenChatExitModal}
            handleOpenTransactionCompleteModal={
              handleOpenTransactionCompleteModal
            }
          />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default ChatDetail;
