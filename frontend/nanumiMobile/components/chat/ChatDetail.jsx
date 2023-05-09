import React, {useState, useCallback, useMemo, useEffect, useRef} from 'react';
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
import {useRecoilState} from 'recoil';
import {userState} from '../../state/user';
import {requestGetTop20ChatLog} from '../../api/chat';
import {convertDate} from '../../util/formatDate';
import {decodeJson} from './../../util/decodeBinaryData';
import * as StompJs from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import ErrorModal from '../modal/ErrorModal';
import DataErrorModal from '../modal/DataErrorModal';

const ChatDetail = ({navigation, productId, chatRoomId}) => {
  const {
    data: chatLogData,
    isLoading: chatLogIsLoading,
    error: chatLogError,
    refetch: chatLogRefetch,
  } = useQuery(['chatLog', chatRoomId], () =>
    requestGetTop20ChatLog(chatRoomId),
  );

  const {data, isLoading, error, refetch} = useQuery(
    ['product', productId],
    () => requestGetDetailProduct(productId),
  );

  // watchposition으로 위도경도 변할때마다 백엔드에쪽에 위도경도 보낸다 이 때 return값을 확인.

  const {showModal, hideModal} = useModal();
  const [user] = useRecoilState(userState);
  const client = useRef(null);
  const [transformChatData, setTransformChatData] = useState([]);

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['40%', '55%'], []);

  const subscribe = () => {
    client.current.subscribe(`/sub/chat/room/${chatRoomId}`, message => {
      const receivedChatTransform = decodeJson(message._binaryBody);
      setTransformChatData(prevChatData => {
        const newChatData = [
          {
            _id: receivedChatTransform?._id,
            text: receivedChatTransform?.message,
            createdAt: convertDate(receivedChatTransform?.sendTime),
            user: {
              _id: receivedChatTransform?.sender,
              name: receivedChatTransform?.senderName,
              // avatar: receivedChatTransform?.senderAvatarUrl,
            },
          },
          ...prevChatData,
        ];
        return newChatData;
      });
    });
  };

  const disconnect = () => {
    client.current.deactivate();
    console.log('연결 끊어짐');
  };

  const connect = () => {
    client.current = new StompJs.Client({
      webSocketFactory: () =>
        new SockJS(`https://k8b103.p.ssafy.io/api/ws-stomp`),

      onConnect: () => {
        console.log('연결됨');

        subscribe();
      },

      onDisconnect: () => {
        disconnect();
      },
    });

    client.current.activate();
  };

  const handleRefetch = () => {
    refetch();
    chatLogRefetch();
  };

  const handleStartTransaction = () => {};

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

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSend = newMessage => {
    const transformMessage = {
      type: 'TALK',
      roomId: chatRoomId,
      sender: user.userId,
      message: newMessage[0].text,
    };

    if (client.current && client.current.connected) {
      client.current.publish({
        destination: '/pub/chat/message',
        headers: {},
        body: JSON.stringify(transformMessage),
      });
    } else {
      console.warn('STOMP client is not connected');
    }
    // setMessages(GiftedChat.append(messages, newMessage));
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
    connect();

    return () => client.current.deactivate();
  }, []);

  useEffect(() => {
    if (chatLogData) {
      setTransformChatData(
        chatLogData.map(message => ({
          _id: message._id,
          text: message.message,
          createdAt: convertDate(message.sendTime),
          user: {
            _id: message.sender,
            name: message.senderName,
          },
        })),
      );
    }
  }, [chatLogData]);

  if (data?.code === 404)
    return <DataErrorModal handlePress={handleCloseAndBack} />;
  if (isLoading || chatLogIsLoading) return <Fallback />;
  if (error || chatLogError) return <ErrorModal handlePress={handleRefetch} />;

  return (
    <>
      <GestureHandlerRootView style={{flex: 1}}>
        <GlobalModal />
        <BottomSheetModalProvider>
          <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
            <ChatHeader
              navigation={navigation}
              handlePresentModalPress={handlePresentModalPress}
            />
            <ChatProductInfo data={data?.result} />
            <GiftedChat
              messages={transformChatData}
              onSend={newMessage => handleSend(newMessage)}
              placeholder="메시지를 입력해주세요..."
              user={{_id: user.userId}}
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
    </>
  );
};

export default ChatDetail;
